import React, { useState } from "react";
import "./style.css";
import { LoginForm } from "../LoginForm/LoginForm.jsx";
import { SignUpForm } from "../SignUpForm/SignUpForm.jsx";
import cover from "../../assets/cover.png"
import banner from "../../assets/banner.png"

export function HomePage({ signIn, signUp }) {
    const [isLogin, setIsLogin] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    return (
        <>
            <div className="split left">
                <div class="centered-item">
                    <img src={cover} className="img-cover"></img>
                </div>
            </div>
            <div className="split right">
                <div className="centered-item">
                    <img src={banner} className="img-banner"></img>
                    <button className="button-container">Login</button>
                    <button className="button-container">SignUp</button>
                </div>

            </div>
            <SignUpForm signUp={signUp} />
            <LoginForm signIn={signIn} />

        </>

    );
}
