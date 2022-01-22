import React, { useState, useEffect } from "react";

export default function Url(props) {
  const { setSubmitted, route, url, link, user } = props;

  const [retrievedUrl, setRetrievedUrl] = useState("");
  const [copyButton, setCopyButton] = useState("Copy URL");
  const [deleteButton, setDeleteButton] = useState("Delete");
  const [shortRoute] = useState("tm57.xyz");

  // queries the database for the URL/link pair and deletes it if it exists:
  const deleteKey = (key) => {
    fetch(`${route}/app/links/${key}`, {
      method: "DELETE"
      // , withCredentials: true
      // , mode: "no-cors"
    })
      .then((res) => res.json())
      .then(() => setDeleted())
  };

  // tells the user their link was successfully deleted:
  const setDeleted = () => {
    setDeleteButton("Deleted!")
    setSubmitted(true)
    setTimeout(() => {
      setDeleteButton("Delete")
    }, 1000)
  }

  // copies short URL to user's clipboard:
  const copyToClipboard = (elementId) => {
    setCopyButton("Copied!")
    setTimeout(() => {
      setCopyButton("Copy URL")
    }, 1000)
    // create a "hidden" input
    let aux = document.createElement("input");

    // assign it the value of the specified element
    aux.setAttribute("value", `${elementId}`);

    // append it to the body
    document.body.appendChild(aux);

    // highlight its content
    aux.select();

    // copy the highlighted text
    document.execCommand("copy");

    // remove it from the body
    document.body.removeChild(aux);
  }

  // queries the database for URL paired with link when component mounts:
  useEffect(() => {
    fetch(`${route}/app/links/${link}`, {
      method: "GET"
      // , withCredentials: true
    })
      .then((res) => res.json())
      .then((data) => {
        setRetrievedUrl(data.stored_url)
      })
  }, []);

  return (
    <div className="url">
      {retrievedUrl ? (
        <h2 className="url-and-hashed-url">
          <button
            className="copy-link column-three"
            onClick={() => copyToClipboard(`${shortRoute}/${link}`)}
          >
            <p>
              {copyButton}
            </p>
          </button>
          <button className="delete-link column-four" onClick={() => deleteKey(props.id)}>
            <p>
              {deleteButton}
            </p>
          </button>
          <div className="url-and-link">
            <p
            className="shortened-url column-one"
            >
              {url}
            </p>
            <p className="shortened-link-row">
              {"Short URL:"}
              <a
              className="shortened-link column-one"
              href={`http://${shortRoute}/${link}`}
              target="_blank"
              rel="noreferrer"
              >
              {`${shortRoute}/${link}`}
              </a>
            </p>
          </div>


        </h2>
      ) : null}
    </div>
  );
}
