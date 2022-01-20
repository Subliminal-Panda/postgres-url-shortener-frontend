import React, { useState } from 'react';

export default function Login(props) {

    const { handleSuccessfulLogin, handleUnsuccessfulLogin, setUser, route } = props;

    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [newUser, setNewUser] = useState(false)


    const handleUserChange = (event) => {
        setUsername(event.target.value)
        setUsernameError("")
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        setPasswordError("")
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
        setConfirmPasswordError("")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch( `${route}/app/user/sessions`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        // ,{ withCredentials: true }
        )
        .then( (response) => response.json())
        .then((data) => {
            console.log("login data:", data)
            if( data === 'created' ) {
                setUser(username)
                handleSuccessfulLogin();
            } else {
                setPasswordError("Incorrect credentials.")
                setUsernameError("Incorrect credentials.")
                handleUnsuccessfulLogin();
            }
        })
        .catch(() => {
            setPasswordError("Unknown error, please try again.")
            setUsernameError("Unknown error, please try again.")
        });
    }

    const handleNewUserSubmit = (event) => {
        event.preventDefault();
        fetch( `${route}/app/user/add`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        // ,{ withCredentials: true }
        )
        .then( (response) => response.json())
        .then((data) => {

            console.log("data:", data)
            if( data === 'New user created' ) {
                handleSuccessfulLogin();
                setUser(username)
            } else {
                setPasswordError("Incorrect credentials.")
                setUsernameError("Incorrect credentials.")
                handleUnsuccessfulLogin();
            }
        })
        .catch(() => {
            setPasswordError("Unknown error, please try again.")
            setUsernameError("Unknown error, please try again.")
        });
    }

    const toggleNewUserForm = () => {
        if(!newUser) {
            setNewUser(true)
        } else {
            setNewUser(false)
        }
    }

    return (
        <div className="login-page">
            <h1>LOGIN TO ACCESS ADMIN DASHBOARD</h1>

            <form
            onSubmit={ !newUser ? handleSubmit : handleNewUserSubmit }
            className="auth-form-wrapper"
            >
            <div className="form-group">
                <input
                    type="text"
                    name="usernameinput"
                    placeholder="Your username"
                    value={ username }
                    onChange={ handleUserChange }
                />
                <p>{usernameError}</p>
            </div>

            <div className="form-group">
                <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    value={ password }
                    onChange={ handlePasswordChange }
                />
                <p>{passwordError}</p>
            </div>

            {newUser ?
            <div className='form-group'>
                <input
                    type="password"
                    name="password"
                    placeholder="Confirm password"
                    value={ confirmPassword }
                    onChange={ handleConfirmPasswordChange }
                />
                <p>{confirmPasswordError}</p>
            </div>
            : null}

                <div className="user-buttons">
                    <button className="login-button" type="submit">{!newUser ? "Login" : "Create Account"}</button>
                    <button className="new-user-button" type="button" onClick={toggleNewUserForm}>{!newUser ? "New user?" : "Returning user?"}</button>
                </div>
            </form>
        </div>
    )
}
