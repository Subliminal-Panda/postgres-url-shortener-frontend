import React, { useState } from "react";

export default function AddUrl(props) {
  const { handleSubmitReload, route } = props;

  const defaultURL = "URL to shorten:"
  const defaultLink = "Optional custom link:"

  const [urlInput, setUrlInput] = useState("");
  const [urlClass, setUrlClass] = useState("");
  const [urlPlaceholder, setUrlPlaceholder] = useState(
    defaultURL
    );
  const [linkInput, setLinkInput] = useState("");
  const [linkClass, setLinkClass] = useState("");
  const [linkPlaceholder, setLinkPlaceholder] = useState(
    defaultLink
  );
  const [submit, setSubmit] = useState("Make")


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
          stored_link: linkInput
        })
      })
      .then((res) => res.json())
      .then((data) => {
        if(data[0] === "New link added to database:") {
          setSubmit("Sent!")
          setTimeout(() => {
            setSubmit("Make")
          }, 1000)
          // resets input fields to default values- ready for another URL and link:
          setUrlClass("");
          setUrlInput("");
          setUrlPlaceholder(defaultURL);
          setLinkClass("")
          setLinkInput("");
          setLinkPlaceholder(defaultLink);
          handleSubmitReload();
          // informs the user (in link input field) that their link is taken.
        } else if(data[0] === "Error: that link is already being used.") {
          setLinkClass("warning");
          setLinkInput("")
          setLinkPlaceholder("Sorry, that link name is taken.");
        }
      })
        // informs the user (in both input fields) that there has been a problem.
        .catch((error) => {
          console.log(error)
          setUrlClass("warning");
          setUrlPlaceholder("Sorry, there's been an error.");
          setUrlInput("")
          setLinkClass("warning");
          setLinkPlaceholder("Sorry, there's been an error.");
          setLinkInput("");
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
      setLinkInput(event);
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
        className={`${urlClass} url-input`}
        type="text"
        placeholder={urlPlaceholder}
        value={urlInput}
        onFocus={() => handleFocus('url')}
        onBlur={() => handleFocus('url')}
        onChange={(event) => handleUrlChange(event.target.value)}
      ></input>
      <input
        type="text"
        className={`${linkClass} link-input`}
        placeholder={linkPlaceholder}
        value={linkInput}
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
