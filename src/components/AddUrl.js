import React, { useState, useRef } from 'react';

export default function AddUrl(props) {

    const { handleSubmitReload } = props;

    const [ urlInput, setUrlInput ] = useState('');
    const [ customLinkInput, setCustomLinkInput ] = useState('');

    const consoleData = useRef("")

    const handleSubmit = (event) => {
        event.preventDefault()
        consoleData.current=(urlInput, customLinkInput);
        if(urlInput !== '') {
            fetch("https://tm-url-shortener-backend.herokuapp.com/url/add", {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify({ "stored_url" : urlInput,
                "stored_link" : customLinkInput})
            }
            ).then(res => res.json()
            ).then(data => {
                console.log("submission data:", data)
                handleSubmitReload();
                setUrlInput('');
                setCustomLinkInput('');
            }).catch(error => {
                console.log("Error occurred during post request:", error);
            })
        }
    }

    const handleUrlChange = (event) => {
        setUrlInput(event)
    }

    const handleCustomLinkChange = (event) => {
        setCustomLinkInput(event)
    }

    return (
            <form className="add-url-form" onSubmit={(event) => handleSubmit(event)}>
                <input type="text" placeholder="Enter a new URL:" value={urlInput} onChange={(event) => handleUrlChange(event.target.value)}></input>
                <input type="text" placeholder="Custom short link (optional):" value={customLinkInput} onChange={(event) => handleCustomLinkChange(event.target.value)}></input>
                <button className='form-submit' type="submit" >Submit Url</button>
            </form>
    )
}
