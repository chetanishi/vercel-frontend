import React from "react";

import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ children }) => {

    // CHECK TOKEN

    const token = localStorage.getItem("token");



    // IF TOKEN EXISTS

    if (token) {

        return children;

    }



    // IF TOKEN DOES NOT EXIST

    return <Navigate to="/login" />;

};



export default ProtectedRoute;