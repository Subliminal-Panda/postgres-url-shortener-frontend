import React, { useState } from "react";

export default function AddUrl(props) {
  const { handleSubmitReload, route } = props;

  const [urlInput, setUrlInput] = useState("");
  const [customLinkInput, setCustomLinkInput] = useState("");
  const [inputClass, setInputClass] = useState("");
  const [inputUrlPlaceholder, setInputUrlPlaceholder] = useState(
    "Enter a new URL:"
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (urlInput !== "") {
      fetch(`${route}/url/add`, {
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
          setInputClass("");
          setInputUrlPlaceholder("Enter a new URL:");
          setUrlInput("");
          setCustomLinkInput("");
          handleSubmitReload();
        })
        .catch((error) => {
          console.log("Error occurred during post request:", error);
        });
    } else {
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
