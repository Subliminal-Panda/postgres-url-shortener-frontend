import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

export default function RouteAway(props) {
  const location = useLocation().pathname.substring(1);
  const [reroute, setReroute] = useState("");
  const [parsed, setParsed] = useState("");

  useEffect(() => {
    fetch(
      `https://tm-url-shortener-backend.herokuapp.com/url/get/link/${location}`
    )
      .then((res) => res.json())
      .then((data) => setReroute(data.stored_url))
      .catch((err) => console.log("Error converting your URL.", err));
  }, []);

  const parseRoute = (toParse) => {
    if (toParse.startsWith("http://") || toParse.startsWith("https://")) {
      setParsed(toParse);
    } else {
      setParsed(`http://${toParse}`);
    }
  };
  const goTo = (destination) => {
    window.location.href = destination;
    return null;
  };

  useEffect(() => {
    if (reroute !== "") {
      parseRoute(reroute);
    }
  }, [reroute]);
  useEffect(() => {
    if (parsed !== "") {
      goTo(parsed);
    }
  }, [parsed]);

  return (
    <div className="user-direct-page">
      <p className="user-direct-info">Attempting to redirect to:</p>
      <a
        className="user-directing-link"
        href={parsed}
        target="_blank"
        rel="noreferrer"
      >
        {parsed}
      </a>
      <a className="return-home-link" href={window.location.origin}>
        Redirects might be blocked... head over to scrambler app?
      </a>
    </div>
  );
}
