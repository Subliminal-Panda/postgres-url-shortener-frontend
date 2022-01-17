import React, { useState } from "react";

export default function AddUrl(props) {
  const { handleSubmitReload, route } = props;

  const [urlInput, setUrlInput] = useState("");
  const [customLinkInput, setCustomLinkInput] = useState("");
  const [urlClass, setUrlClass] = useState("");
  const [urlPlaceholder, setUrlPlaceholder] = useState(
    "Enter a new URL:"
  );
  const [linkClass, setLinkClass] = useState("");
  const [linkPlaceholder, setLinkPlaceholder] = useState(
    "Custom short link (optional):"
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
          setUrlClass("");
          setUrlPlaceholder("Enter a new URL:");
          setUrlInput("");
          setCustomLinkInput("");
          handleSubmitReload();
        })
        // informs the user (in URL input field) that there has been a problem.
        .catch(() => {
          setUrlClass("warning");
          setUrlPlaceholder("An error occurred during post request");
        });
        //informs the user that they haven't entered a URL
    } else {
      setUrlClass("warning");
      setUrlPlaceholder("You need a URL before you can submit.");
    }
  };

  // updates URL field with user input
  const handleUrlChange = (event) => {
    if(!String(event).includes(" ")){
      setUrlClass("");
      setUrlPlaceholder("Enter a new URL:")
      setUrlInput(event);
    } else {
      setUrlClass("warning");
      setUrlPlaceholder("You can't enter a space in your URL. Sorry!")
    }
  };

  // updates custom link field with user input
  const handleCustomLinkChange = (event) => {
    if(!String(event).includes(" ")){
      setLinkClass("");
      setLinkPlaceholder("Custom short link (optional):")
      setCustomLinkInput(event);
    } else {
      setLinkClass("warning");
      setLinkPlaceholder("You can't enter a space in your Link. Sorry!")
    }
  };

  // resets URL input field from "warning" state for normal input.
  const handleClick = (field) => {
    if(field === "url") {
      setUrlClass("");
      setUrlPlaceholder("Enter a new URL:");
    } else {
      setLinkClass("");
      setLinkPlaceholder("Custom short link (optional):");
    }
  };

  // renders URL submission fields and button
  return (
    <form className="add-url-form" onSubmit={(event) => handleSubmit(event)}>
      <input
        className={urlClass}
        type="text"
        placeholder={urlPlaceholder}
        value={urlInput}
        onClick={() => handleClick('url')}
        onChange={(event) => handleUrlChange(event.target.value)}
      ></input>
      <input
        type="text"
        className={linkClass}
        placeholder={linkPlaceholder}
        value={customLinkInput}
        onClick={() => handleClick('link')}
        onChange={(event) => handleCustomLinkChange(event.target.value)}
      ></input>
      <button className="form-submit" type="submit">
        Submit Url
      </button>
    </form>
  );
}
