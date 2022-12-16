import React from "react";
import "./style.css";

export function SignUpForm() {
    return (
        <div className="signup-form">
            <form>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="username" required />
                </div>
                <div className="input-container">
                    <label>Login </label>
                    <input type="text" name="login" required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="password" required />
                </div>
                <button className="button-container"> Register
                </button>
            </form>
        </div>
    )
}

