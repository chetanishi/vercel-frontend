import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";

import axios from "axios";



const LoginSignup = () => {

    const navigate=useNavigate();
    // LOGIN / SIGNUP STATE

    const [state, setState] = useState("Login");

 

    // FORM DATA

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });



    // INPUT CHANGE HANDLER

    const changeHandler = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

    };

         // SIGNUP FUNCTION
 const signupHandler = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:3200/signup",
                formData
            );
                console.log(response.data);
                navigate("/")
            alert(response.data.message);

        } catch (error) {

            console.log(error);

            alert(error.response.data.message);
           }
 };



    // LOGIN FUNCTION

    const loginHandler = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:3200/login",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );
               navigate("/")
            console.log(response.data);
            // STORE TOKEN
             localStorage.setItem("token", response.data.token);
             alert(response.data.message);

        } catch (error) {

            console.log(error);

            alert(error.response.data.message);

        }

    };



    return (

        <div className="signup">

            <div className="signup-container">

                <h1>{state}</h1>
             <form
                    onSubmit={
                        state === "Login"
                            ? loginHandler
                            : signupHandler
                    }
                >

                    <div className="signup-fields">

                        {/* USERNAME FIELD ONLY FOR SIGNUP */}

                        {state === "Sign Up" && (

                            <input
                                type="text"
                                placeholder="Your Name"
                                name="username"
                                value={formData.username}
                                onChange={changeHandler}
                            />

                        )}



                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                        />



                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                        />

                    </div>



                    <button type="submit">

                        {state === "Login"
                            ? "Login"
                            : "Sign Up"}

                    </button>

                </form>

     {/* TOGGLE LOGIN / SIGNUP */}

                {state === "Login" ? (

                    <p className="signup-login">

                        Create a new account?

                        <span
                            onClick={() => setState("Sign Up")}
                        >
                            Click Here
                        </span>

                    </p>

                ) : (

                    <p className="signup-login">

                        Already have an account?

                        <span
                            onClick={() => setState("Login")}
                        >
                            Login Here
                        </span>

                    </p>

                )}

            </div>

        </div>

    );

};



export default LoginSignup;