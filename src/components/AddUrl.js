import React, { useState } from "react";

export default function AddUrl(props) {
  const { handleSubmitReload } = props;

  const [urlInput, setUrlInput] = useState("");
  const [customLinkInput, setCustomLinkInput] = useState("");
  const [inputClass, setInputClass] = useState("");
  const [inputUrlPlaceholder, setInputUrlPlaceholder] = useState(
    "Enter a new URL:"
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (urlInput !== "") {
      setInputClass("");
      setInputUrlPlaceholder("Enter a new URL:");
      fetch("https://tm-url-shortener-backend.herokuapp.com/url/add", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          stored_url: urlInput,
          stored_link: customLinkInput
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("submission data:", data);
          handleSubmitReload();
          setUrlInput("");
          setCustomLinkInput("");
        })
        .catch((error) => {
          console.log("Error occurred during post request:", error);
        });
    } else {
      console.log("you need to enter a URL!");
      setInputClass("warning");
      setInputUrlPlaceholder("You need a URL before you can submit.");
    }
  };

  const handleUrlChange = (event) => {
    setUrlInput(event);
  };

  const handleCustomLinkChange = (event) => {
    setCustomLinkInput(event);
  };

  const handleClick = () => {
    setInputClass("");
    setInputUrlPlaceholder("Enter a new URL:");
  };

  return (
    <form className="add-url-form" onSubmit={(event) => handleSubmit(event)}>
      <input
        className={inputClass}
        type="text"
        placeholder={inputUrlPlaceholder}
        value={urlInput}
        onClick={() => handleClick()}
        onChange={(event) => handleUrlChange(event.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Custom short link (optional):"
        value={customLinkInput}
        onChange={(event) => handleCustomLinkChange(event.target.value)}
      ></input>
      <button className="form-submit" type="submit">
        Submit Url
      </button>
    </form>
  );
}
