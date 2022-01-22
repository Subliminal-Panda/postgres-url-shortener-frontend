import React, { useState, useEffect } from "react";
import { cookies, CookiesProvider, useCookies } from "react-cookie";

import "../styles/styles.css";
import Home from "./Home";
import Login from "./Login";

export default function App() {

  const [loggedInStatus, setLoggedInStatus ] = useState("NOT_LOGGED_IN")
  const [user, setUser ] = useState("NOT_LOGGED_IN")
  const [ cookies, setCookie, removeCookie ] = useCookies(['loggedInUser']);

  // optional substitute route for running in local/test environment:
  // const [route] = useState("http://127.0.0.1:5000");
  const [route] = useState("https://tm-url-shortener-backend.herokuapp.com");

  const handleSuccessfulLogin = () => {
    setLoggedInStatus("LOGGED_IN")
  }

  const handleUnsuccessfulLogin = () => {
    setUser("NOT_LOGGED_IN")
    setCookie("loggedInUser", "NOT_LOGGED_IN")
    setLoggedInStatus("NOT_LOGGED_IN")
  }

  const handleSuccessfulLogout = () => {
    setUser("NOT_LOGGED_IN")
    setCookie("loggedInUser", "NOT_LOGGED_IN")
    setLoggedInStatus("NOT_LOGGED_IN")
  }

  const checkLoginStatus = () => {
    if( cookies.loggedInUser !== "NOT_LOGGED_IN") {
      fetch(`${route}/app/auth/${cookies.loggedInUser}`, { method: "GET"}
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
    if(user !== "NOT_LOGGED_IN") {
      setCookie("loggedInUser", user)
    } else {
      setCookie("loggedInUser", "NOT_LOGGED_IN")
    }
  },[user, handleSuccessfulLogin])

  return (
    <div className="app">
      <CookiesProvider>
        { loggedInStatus === "LOGGED_IN" || cookies.loggedInUser !== "NOT_LOGGED_IN" ?
        <Home
        user={cookies.loggedInUser}
        route={route} />
        :
        <Login
        handleSuccessfulLogin={handleSuccessfulLogin}
        handleSuccessfulLogout={handleSuccessfulLogout}
        handleUnsuccessfulLogin={handleUnsuccessfulLogin}
        setUser={setUser}
        route={route} />}
        { loggedInStatus === "LOGGED_IN" || cookies.loggedInUser !== "NOT_LOGGED_IN" ? <button className="logout-button" onClick={() => handleSuccessfulLogout()}>Log out</button> : null }
      </CookiesProvider>
    </div>
  );
}
