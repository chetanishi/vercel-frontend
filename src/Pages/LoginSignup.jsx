import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";

import axios from "axios";



const LoginSignup = () => {

    const navigate=useNavigate();
    // LOGIN / SIGNUP STATE


    const [state, setState] = useState("Login");
    const [loading, setLoading] = useState(false);
 

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
                "https://vercel-backend-umber-kappa.vercel.app/signup",
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
         setLoading(true);

        try {

            const response = await axios.post(
                "https://vercel-backend-umber-kappa.vercel.app/login",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.user._id);
              setLoading(false);
              alert(response.data.message);
               navigate("/");

        } catch (error) {

             setLoading(false);
            console.log(error);
            alert( error.response?.data?.message || "Something went wrong");

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



                  <button type="submit" disabled={loading}>
                      { loading ? ( <span className="loader"></span> ) :
                       ( state === "Login" ? "Login" : "Sign Up" ) }
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