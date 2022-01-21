import React, { useState, useEffect } from "react";
import AddUrl from "./AddUrl";
import Url from "./Url";

export default function Home(props) {
  const { route, user } = props
  const [allUrlKeys, setAllUrlKeys] = useState([]);
  const [submitted, setSubmitted] = useState(true);

  // queries database for list of all saved shrunken URL's:
  const getUserUrlKeys = () => {
    fetch(`${route}/app/user/links/${user}`, {
      method: "GET"
      // , withCredentials: true
      // , mode: "no-cors"
    })
    .then( res => res.json())
    .then((resData) => {
      console.log("jsonified response:", resData)
      setAllUrlKeys(resData)
      resData.map((retrieved) => {
        console.log("retriieved:", retrieved)
      })
    })
      .then(() => separateUrlKeys())
  };

  // renders each saved URL/link/shrunken URL on the page (see URL component for rendering details):
  const separateUrlKeys = () => {
    return allUrlKeys.map((key) => {
      console.log("Key:", key)
      return (
        <div className="url-keys-wrap" key={`url${key.id}`}>
          <Url
            setSubmitted={setSubmitted}
            route={route}
            url={key.stored_url}
            link={key.stored_link}
            id={key.id}
            user={user}
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
    if(submitted === true && user !== "NOT_LOGGED_IN") {
      getUserUrlKeys();
      setSubmitted(false);
    }
  }, [submitted, user]);

  // renders app on page:
  return (
    <div className="home">
      <h1 className="main-title">Short Linkster</h1>
      <div className="add-url-container">
        <AddUrl route={route} handleSubmitReload={handleSubmitReload} user={user} />
      </div>
      <div className="column-headings columns">
        <h1 className="column-one">URL:</h1>
        <h1 className="column-two">Link:</h1>
      </div>
      <h2 className="columns">{separateUrlKeys()}</h2>
    </div>
  );
}
