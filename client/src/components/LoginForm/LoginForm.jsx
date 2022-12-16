import React from "react";
import { useState } from "react";
import "./style.css";

export function LoginForm({ signIn }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-form">
            <form>
                <div className="input-container">
                    <label>Login </label>
                    <input
                        onChange={(event) => {
                            setLogin(event.target.value);
                            console.log(event.target.value);
                        }}
                        type="text"
                        name="username"
                        required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input
                        onChange={(event) => {
                            setPassword(event.target.value);
                            console.log(event.target.value);
                        }}
                        type="password"
                        name="password"
                        required />
                </div>
                <button className="button-container"
                    onClick={(event) => {
                        event.preventDefault();
                        submitLogin();
                    }}
                > Enter
                </button>
            </form>
        </div>

    );

    function submitLogin() {
        signIn({ login: login, password: password })
    }

}
