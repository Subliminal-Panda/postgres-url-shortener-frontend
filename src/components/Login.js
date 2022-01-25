import React, { useEffect, useState } from 'react';

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
            // withCredentials: true,
            // mode: "no-cors",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        )
        .then( (response) => response.json())
        .then((data) => {
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
            // , withCredentials: true,
            // mode: "no-cors",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        )
        .then( (response) => response.json())
        .then((data) => {
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

    useEffect(() => {
        setUsernameError("")
        setPasswordError("")
        setConfirmPasswordError("")
    }, [newUser])

    return (
        <div className="login-page">
            <h1 className='login-title'>Welcome to Short Linkster!</h1>
            <h1 className='login-heading'>{!newUser ? "Login to access your short URLs." : "Please create an account."}</h1>

            <form
            onSubmit={ !newUser ? handleSubmit : handleNewUserSubmit }
            className="auth-form-wrapper"
            autoComplete='off'
            >

            <div className="form-group name-entry">
                <input
                    type="text"
                    // autoComplete='off'
                    name="nameinput"
                    placeholder="Your username"
                    value={ username }
                    onChange={ handleUserChange }
                />
                <p>{usernameError}</p>
            </div>

            <div className="form-group">
                <input
                    type="password"
                    // autoComplete='off'
                    name="passwordinput"
                    placeholder="Your password"
                    value={ password }
                    onChange={ handlePasswordChange }
                />
                <p>{passwordError}</p>
            </div>

            {newUser ?
            <div className='form-group'>
                <input
                    // autoComplete='off'
                    type="password"
                    name="passwordinput"
                    placeholder="Confirm password"
                    value={ confirmPassword }
                    onChange={ handleConfirmPasswordChange }
                />
                <p>{confirmPasswordError}</p>
            </div>
            : null}

                <div className="user-buttons">
                    <button className="login-button" type="submit">{!newUser ? "Login" : "Create Account"}</button>
                    <button id="new-user-button" type="button" onClick={toggleNewUserForm}>
                    {!newUser ?
                        "I'm a new user"
                        :
                        "I'm a returning user"
                    }
            </button>
                </div>
            </form>
        </div>
    )
}
