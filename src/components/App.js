import React, { useState, useEffect } from "react";

import "../styles/styles.css";
import Home from "./Home";
import Login from "./Login";

export default function App() {

  const [loggedInStatus, setLoggedInStatus ] = useState("NOT_LOGGED_IN")
  const [user, setUser ] = useState("NOT_LOGGED_IN")
  // optional substitute route for running in local/test environment:
  // const [route] = useState("http://127.0.0.1:5000");
  const [route] = useState("https://tm-url-shortener-backend.herokuapp.com");

  const handleSuccessfulLogin = () => {
    setLoggedInStatus("LOGGED_IN")
  }

  const handleUnsuccessfulLogin = () => {
    setLoggedInStatus("NOT_LOGGED_IN")
  }

  const handleSuccessfulLogout = () => {
    setLoggedInStatus("NOT_LOGGED_IN")
  }

  const checkLoginStatus = () => {
    if( user !== "NOT_LOGGED_IN") {
      fetch(`${route}/app/auth/${user}`, { method: "GET"}
      )
      .then((response) => response.json())
      .then((data) => {
        const loggedIn = data.logged_in
        console.log("logged in from db first?", loggedIn);
        if ( loggedIn && loggedInStatus === "LOGGED_IN" ) {
          return loggedIn;
        } else if ( loggedIn && loggedInStatus === "NOT_LOGGED_IN" ) {
          setLoggedInStatus("LOGGED_IN");
        } else if ( !loggedIn && loggedInStatus === "LOGGED_IN" ) {
          setLoggedInStatus("NOT_LOGGED_IN");
        }
        console.log("loggedIn from db:", loggedIn)
      }).then(() => {
        console.log("loggedInStatus from app:", loggedInStatus)
      })
      .catch((error) => {
        console.log( "Error", error );
      })
    }
  }

  useEffect(() => {
    checkLoginStatus();
  },[user, handleSuccessfulLogin])

  return (
    <div className="app">
      { loggedInStatus === "LOGGED_IN" ?
      <Home
      user={user}
      route={route} />
      :
      <Login
      handleSuccessfulLogin={handleSuccessfulLogin}
      handleSuccessfulLogout={handleSuccessfulLogout}
      handleUnsuccessfulLogin={handleUnsuccessfulLogin}
      setUser={setUser}
      route={route} />}
    </div>
  );
}
