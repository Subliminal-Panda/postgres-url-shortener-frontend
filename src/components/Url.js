import React, { useState, useEffect } from "react";

export default function Url(props) {
  const { setSubmitted, route } = props;

  const [url, setUrl] = useState("");
  const [copyButton, setCopyButton] = useState("Copy");
  const [deleteButton, setDeleteButton] = useState("Delete");
  const [shortRoute] = useState("tm57.xyz");

  // queries the database for the URL/link pair and deletes it if it exists:
  const deleteKey = (key) => {
    fetch(`${route}/nodirect/links/${key}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((resData) => console.log(resData))
      .then(() => setDeleted())
      .catch((err) => console.log("Error deleting key:", err));
  };

  const setDeleted = () => {
    setDeleteButton("Deleted!")
    setSubmitted()
    setTimeout(() => {
      setDeleteButton("Delete")
    }, 1000)
  }

  const copyToClipboard = (elementId) => {
    setCopyButton("Copied!")
    setTimeout(() => {
      setCopyButton("Copy")
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
    fetch(`${props.route}/nodirect/links/${props.link}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setUrl(data.stored_url))
      .catch((err) => console.log("Error converting your URL.", err));
  }, []);

  return (
    <div className="url">
      {url ? (
        <h2 className="url-and-hashed-url">
          {/* the URL the user made a link for: */}
          <a
            className="shortened-url column-one"
            href={`http://${shortRoute}/${props.link}`}
            target="_blank"
            rel="noreferrer"
          >
            {url}
          </a>
          {/* the shortened slug given by the backend and paired with the URL: */}
          <a
            className="shortened-link column-two"
            href={`http://${shortRoute}/${props.link}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${shortRoute}/${props.link}`}
          </a>
          {/* a working "shortened" url the user can place in the address bar, similar to tinyurl: */}
          <button
            className="copy-link column-three"
            onClick={() => copyToClipboard(`${shortRoute}/${props.link}`)}
          >
            <p>
              {copyButton}
            </p>
          </button>
          {/* deletes the current URL and its link from the database. */}
          <button className="delete-link column-four" onClick={() => deleteKey(props.id)}>
            <p>
              {deleteButton}
            </p>
          </button>
        </h2>
      ) : null}
    </div>
  );
}
