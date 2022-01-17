import React, { useState, useEffect, useRef } from "react";
import AddUrl from "./AddUrl";
import Url from "./Url";

export default function Home() {
  // optional substitute route for running in local/test environment:
  // const [route] = useState("http://127.0.0.1:5000");
  const [route] = useState("https://tm-url-shortener-backend.herokuapp.com/");
  const [allUrlKeys, setAllUrlKeys] = useState([]);
  const [submitted, setSubmitted] = useState([]);

  // queries database for list of all saved shrunken URL's:
  const getAllUrlKeys = () => {
    fetch(`${route}/nodirect/links`, { method: "GET", mode: "no-cors" })
      .then((res) => res.json())
      .then((resData) => setAllUrlKeys(resData))
      .then(() => separateUrlKeys())
      .catch((err) => console.log("Error retrieving all URLs.", err));
  };

  // renders each saved URL/link/shrunken URL on the page (see URL component for rendering details):
  const separateUrlKeys = () => {
    return allUrlKeys.map((key) => {
      return (
        <div className="url-keys-wrap" key={`url${key.id}`}>
          <Url
            setSubmitted={setSubmitted}
            route={route}
            url={key.stored_link}
            id={key.id}
          />
        </div>
      );
    });
  };

  // queries database again each time a new URL is submitted, so the list will show the newly submitted URL:
  const handleSubmitReload = () => {
    setSubmitted(true);
  };

  useEffect(() => {
    getAllUrlKeys();
    setSubmitted(false);
  }, [submitted]);

  // renders app on page:
  return (
    <div className="home">
      <h1>Welcome to Tristan's Link Scrambler!</h1>
      <div className="add-url-container">
        <AddUrl route={route} handleSubmitReload={handleSubmitReload} />
      </div>
      <h2>{separateUrlKeys()}</h2>
    </div>
  );
}
