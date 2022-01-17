import React, { useState, useEffect } from "react";

export default function Url(props) {
  const { setSubmitted, route } = props;

  const [url, setUrl] = useState("");

  // queries the database for the URL/link pair and deletes it if it exists:
  const deleteKey = (key) => {
    fetch(`${route}/nodirect/links/${key}`, { method: "DELETE", mode: "no-cors" })
      .then((res) => res.json())
      .then((resData) => console.log(resData))
      .then(() => setSubmitted())
      .catch((err) => console.log("Error deleting key:", err));
  };

  function copyToClipboard(elementId) {
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
    fetch(`${props.route}/nodirect/links/${props.url}`, { method: "GET", mode: "no-cors" })
      .then((res) => res.json())
      .then((data) => setUrl(data.stored_url))
      .catch((err) => console.log("Error converting your URL.", err));
  }, []);

  return (
    <div className="url">
      {url ? (
        <h2 className="url-and-hashed-url">
          {/* the URL the user made a link for: */}
          <p>URL:</p>
          <a
            className="shortened-url"
            href={`${route}/${props.url}`}
            target="_blank"
            rel="noreferrer"
          >
            {url}
          </a>
          {/* the shortened slug given by the backend and paired with the URL: */}
          <p>Link:</p>
          <a
            className="shortened-url"
            href={`${route}/${props.url}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${route}/${props.url}`}
          </a>
          {/* a working "shortened" url the user can place in the address bar, similar to tinyurl: */}
          <button onClick={() => copyToClipboard(`${route}/${props.url}`)}>
            copy URL to clipboard
          </button>
          {/* deletes the current URL and its link from the database. */}
          <button className="delete-link" onClick={() => deleteKey(props.id)}>
            Delete Link
          </button>
        </h2>
      ) : null}
    </div>
  );
}
