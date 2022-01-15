import React, { useState, useEffect } from 'react';
import AddUrl from './AddUrl';
import Url from './Url';

export default function Home() {

    const [ allUrlKeys, setAllUrlKeys ] = useState([])
    const [ submitted, setSubmitted ] = useState([])
    const [ route, setRoute ] = useState("https://tm-url-shortener-backend.herokuapp.com")

    const getAllUrlKeys = () => {
        fetch(`${route}/url/get`
        ).then(res => res.json()
        ).then(resData => setAllUrlKeys(resData)
        ).catch(err => console.log("Error retrieving all URLs.", err));
    }

    const separateUrlKeys = () => {
        return allUrlKeys.map(key => {
            console.log("Key:", key)
            return(
            <div className="url-keys-wrap" key={`url${key.id}`}>
                <Url setSubmitted={setSubmitted} route={route} url={key.stored_link} id={key.id}/>
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
            <div className="add-url-container">
              <AddUrl route={route} handleSubmitReload={handleSubmitReload} />
            </div>
            <h2>{separateUrlKeys()}</h2>
        </div>
    )
}
