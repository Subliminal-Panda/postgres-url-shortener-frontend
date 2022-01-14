import React, { useState, useEffect } from 'react';

export default function Url (props) {
    const [ url, setUrl ] = useState("");

    const deleteKey = (key) => {
        fetch(`https://tm-url-shortener-backend.herokuapp.com/url/delete/id/${key}`,  { method: "DELETE" }
        ).then(res => res.json()
        ).then(resData => console.log(resData)
        ).then(() => props.setSubmitted()
        ).catch(err => console.log("Error deleting key:", err));
    }

    useEffect(() => {
        fetch(`https://tm-url-shortener-backend.herokuapp.com/url/get/link/${props.url}`
        ).then(res => res.json()
        ).then(data => setUrl(data.stored_url)
        ).catch(err => console.log("Error converting your URL.", err));
    }, [])

    return (
        <div className="url">
            {url ?
                <div className="url-and-hashed-url">
                    <p>URL:</p>
                    <a className='shortened-url' href={
                        url.startsWith("http://") || url.startsWith("https://") ?
                        url :
                        `http://${url}`} target="_blank">{url}</a>
                    <p>Short Link:</p>
                    <a className='shortened-url' href={
                        url.startsWith("http://") || url.startsWith("https://") ?
                        url :
                        `http://${url}`} target="_blank">
                            {props.url}
                    </a>
                    <button className='delete-link' onClick={() => deleteKey(props.id)}>Delete Link</button>
                </div>
                : null}
        </div>
    )
}
