import React, { useState } from "react";

export default function AddUrl(props) {
  const { handleSubmitReload, route } = props;

  const defaultURL = "URL to shorten:"
  const defaultLink = "(Optional) custom link:"

  const [urlInput, setUrlInput] = useState("");
  const [customLinkInput, setCustomLinkInput] = useState("");
  const [urlClass, setUrlClass] = useState("");
  const [urlPlaceholder, setUrlPlaceholder] = useState(
    defaultURL
  );
  const [linkClass, setLinkClass] = useState("");
  const [linkPlaceholder, setLinkPlaceholder] = useState(
    defaultLink
  );
  const [submit, setSubmit] = useState("Send")


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
          setSubmit("Sent!")
          setTimeout(() => {
            setSubmit("Send")
          }, 1000)
          setUrlClass("");
          setUrlInput("");
          setUrlPlaceholder(defaultURL);
          setLinkClass("")
          setCustomLinkInput("");
          setLinkPlaceholder(defaultLink);
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
      setUrlPlaceholder("You need a URL.");
    }
  };

  // updates URL field with user input
  const handleUrlChange = (event) => {
    if(!String(event).includes(" ")){
      setUrlClass("");
      setUrlPlaceholder(defaultURL)
      setUrlInput(event);
    } else {
      setUrlClass("warning");
      setUrlPlaceholder("No spaces allowed.")
    }
  };

  // updates custom link field with user input
  const handleCustomLinkChange = (event) => {
    if(!String(event).includes(" ")){
      setLinkClass("");
      setLinkPlaceholder(defaultLink)
      setCustomLinkInput(event);
    } else {
      setLinkClass("warning");
      setLinkPlaceholder("No spaces allowed.")
    }
  };

  // resets URL input field from "warning" state for normal input.
  const handleFocus = (field) => {
    if(field === "url") {
      setUrlClass("");
      setUrlPlaceholder(defaultURL);
    } else {
      setLinkClass("");
      setLinkPlaceholder(defaultLink);
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
        onFocus={() => handleFocus('url')}
        onBlur={() => handleFocus('url')}
        onChange={(event) => handleUrlChange(event.target.value)}
      ></input>
      <input
        type="text"
        className={linkClass}
        placeholder={linkPlaceholder}
        value={customLinkInput}
        onFocus={() => handleFocus('link')}
        onBlur={() => handleFocus('link')}
        onChange={(event) => handleCustomLinkChange(event.target.value)}
      ></input>
      <button className="form-submit" type="submit">
        <p>
          {submit}
        </p>
      </button>
    </form>
  );
}
