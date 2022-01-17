import React, { useState, useEffect, useRef } from "react";
import AddUrl from "./AddUrl";
import Url from "./Url";

export default function Home() {
  // optional substitute route for running in local/test environment:
  // const [route] = useState("http://127.0.0.1:5000");
  const [route] = useState("https://tm-url-shortener-backend.herokuapp.com/");
  const [allUrlKeys, setAllUrlKeys] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [slug, setSlug] = useState("");
  const [bigMessage, setBigMessage] = useState("");

  const opened = useRef(false);
  const lastSlug = useRef("");

  // requests URL connected with link in database. If found, a 301 redirect to the URL is sent from the database:
  const checkReroute = () => {
    setSlug(window.location.pathname.substring(1));
    if (slug !== "" && slug !== undefined) {
      lastSlug.current = slug;
      console.log("slug:", slug);
      fetch(`${route}/${slug}`).catch(() =>
        // if redirect is blocked by CORS policy, the following message is displayed to the user, and an attempt is made to open the URL in a new window:
        findUrlFromLink(
          `Attempting redirect to "${slug}", but it might be blocked by your browser. If you don't get redirected, try the link above.`
        )
      );
    } else {
      // if no shrunken URL is currently being used, queries database for list of shrunken URLs:
      getAllUrlKeys();
    }
  };

  // queries database for the URL connected with the link in the slug:
  const findUrlFromLink = (message) => {
    fetch(`${route}/nodirect/links/${slug}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => openUrlInNewWindow(data.stored_url))
      .catch((error) => setBigMessage(message, error));
    setBigMessage(message);
    getAllUrlKeys();
  };

  // when URL is returned from database, attempts to open the URL in a new window:
  const openUrlInNewWindow = (passedUrl) => {
    const a = document.createElement("a");
    console.log("passed url", passedUrl);
    if (!opened.current) {
      if (passedUrl.startsWith("https://")) {
        a.href = `${passedUrl}`;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
      } else if (passedUrl.startsWith("http://")) {
        const newUrl = passedUrl.replace("http", "https");
        a.href = `${newUrl}`;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
      } else {
        a.href = `https://${passedUrl}`;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
      }
      opened.current = true;
      setBigMessage(
        `Redirects are blocked, so I opened "${slug}" in a new window. If that didn't work, click the link above!`
      );
    } else {
      console.log("already redirected once.");
    }
  };

  // queries database for list of all saved shrunken URL's:
  const getAllUrlKeys = () => {
    fetch(`${route}/nodirect/links`, { method: "GET" })
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
    setSubmitted(false);
  }, [submitted]);

  // attempts to reroute if URL slug is changed or page is reloaded:
  useEffect(() => {
    checkReroute();
    if (slug !== undefined && slug !== "" && lastSlug.current !== slug)
      opened.current = false;
  }, [slug]);

  // renders app on page:
  return (
    <div className="home">
      <h1>Welcome to Tristan's Link Scrambler!</h1>
      <div className="add-url-container">
        <AddUrl route={route} handleSubmitReload={handleSubmitReload} />
      </div>
      <h2>{separateUrlKeys()}</h2>
      <h2 className="big-red-message">{bigMessage}</h2>
    </div>
  );
}
