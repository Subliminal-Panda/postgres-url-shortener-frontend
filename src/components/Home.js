import React, { useState, useEffect } from 'react';
import AddUrl from './AddUrl';
import Url from './Url';

export default function Home(props) {

    const [ allUrlKeys, setAllUrlKeys ] = useState([])
    const [ submitted, setSubmitted ] = useState([])

    const getAllUrlKeys = () => {
        fetch('https://tm-url-shortener-backend.herokuapp.com/url/get'
        ).then(res => res.json()
        ).then(resData => setAllUrlKeys(resData)
        ).catch(err => console.log("Error retrieving all URLs.", err));
    }



    const separateUrlKeys = () => {
        return allUrlKeys.map(key => {
            console.log("Key:", key)
            return(
            <div className="url-keys-wrap" key={`url${key.id}`}>
                <Url setSubmitted={setSubmitted} url={key.stored_link} id={key.id}/>
            </div>
        )})
    }

    const handleSubmitReload = () => {
        setSubmitted(true);
    }

    useEffect(() => {
            getAllUrlKeys();
            separateUrlKeys();
            setSubmitted(false);
    },[submitted])

    return (
        <div className="home">
            <h1>Welcome to Tristan's Link Scrambler!</h1>
            <div className="add-url-container"><AddUrl handleSubmitReload={handleSubmitReload} /></div>
            <h2>{separateUrlKeys()}</h2>
        </div>
    )
}
