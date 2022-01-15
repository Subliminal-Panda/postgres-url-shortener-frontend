import React, { useState, useEffect } from "react";

export default function Url(props) {
  const [url, setUrl] = useState("");

  const { setSubmitted, route } = props;

  const deleteKey = (key) => {
    fetch(`${route}/url/delete/id/${key}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((resData) => console.log(resData))
      .then(() => setSubmitted())
      .catch((err) => console.log("Error deleting key:", err));
  };

  useEffect(() => {
    fetch(`${props.route}/url/get/link/${props.url}`)
      .then((res) => res.json())
      .then((data) => setUrl(data.stored_url))
      .catch((err) => console.log("Error converting your URL.", err));
  }, []);

  return (
    <div className="url">
      {url ? (
        <h2 className="url-and-hashed-url">
          <p>URL:</p>
          <a
            className="shortened-url"
            href={
              url.startsWith("http://") || url.startsWith("https://")
                ? url
                : `http://${url}`
            }
            target="_blank"
            rel="noreferrer"
          >
            {url}
          </a>
          <p>Short Link:</p>
          <a
            className="shortened-url"
            href={
              url.startsWith("http://") || url.startsWith("https://")
                ? url
                : `http://${url}`
            }
            target="_blank"
            rel="noreferrer"
          >
            {props.url}
          </a>
          <p>Shrunken URL:</p>
          <p>{`${window.location.origin}/${props.url}`}</p>
          <button className="delete-link" onClick={() => deleteKey(props.id)}>
            Delete Link
          </button>
        </h2>
      ) : null}
    </div>
  );
}
