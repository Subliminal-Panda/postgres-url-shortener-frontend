import React, { useState } from "react";

export default function AddUrl(props) {
  const { handleSubmitReload, route } = props;

  const [urlInput, setUrlInput] = useState("");
  const [customLinkInput, setCustomLinkInput] = useState("");
  const [inputClass, setInputClass] = useState("");
  const [inputUrlPlaceholder, setInputUrlPlaceholder] = useState(
    "Enter a new URL:"
  );

  // sends URL and custom link entered by user to database. If no custom link, database will generate a random 10-digit link.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (urlInput !== "") {
      fetch(`${route}/nodirect/links`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          stored_url: urlInput,
          stored_link: customLinkInput
        })
      })
      // resets input fields to default values- ready for another URL and link!
        .then(() => {
          setInputClass("");
          setInputUrlPlaceholder("Enter a new URL:");
          setUrlInput("");
          setCustomLinkInput("");
          handleSubmitReload();
        })
        // informs the user (in URL input field) that there has been a problem.
        .catch(() => {
          setInputClass("warning");
          setInputUrlPlaceholder("An error occurred during post request");
        });
        //informs the user that they haven't entered a URL
    } else {
      setInputClass("warning");
      setInputUrlPlaceholder("You need a URL before you can submit.");
    }
  };

  // updates URL field with user input
  const handleUrlChange = (event) => {
    setUrlInput(event);
  };

  // updates custom link field with user input
  const handleCustomLinkChange = (event) => {
    setCustomLinkInput(event);
  };

  // resets URL input field from "warning" state for normal input.
  const handleClick = () => {
    setInputClass("");
    setInputUrlPlaceholder("Enter a new URL:");
  };

  // renders URL submission fields and button
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
