import logo from "../Assets/logo.png";
import "./NavBar.css";
import cart_icon from "../Assets/cart_icon.png";

import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { ShopContext } from "../../Context/ShopContext.jsx";



function NavBar() {

    const [menu, setMenu] = useState("shop");

    const { getTotalCartItems } = useContext(ShopContext);

    const navigate = useNavigate();



    // CHECK TOKEN DIRECTLY

    const token = localStorage.getItem("token");



    // LOGOUT FUNCTION

    const logoutHandler = () => {

        // REMOVE TOKEN

        localStorage.removeItem("token");



        alert("Logout Successful");



        // REFRESH APPLICATION

        window.location.replace("/");

    };



    return (

        <div className="navbar">

            <div className="nav-logo">

                <img src={logo} alt="" />

                <p>SHOPPER</p>

            </div>



            <ul className="nav-menu">

                <li onClick={() => setMenu("shop")}>

                    <Link
                        to="/"
                        style={{ textDecoration: "none" }}
                    >
                        Shop
                    </Link>

                    {menu === "shop" ? <hr /> : <></>}

                </li>



                <li onClick={() => setMenu("mens")}>

                    <Link
                        to="/mens"
                        style={{ textDecoration: "none" }}
                    >
                        Mens
                    </Link>

                    {menu === "mens" ? <hr /> : <></>}

                </li>



                <li onClick={() => setMenu("womens")}>

                    <Link
                        to="/womens"
                        style={{ textDecoration: "none" }}
                    >
                        Women
                    </Link>

                    {menu === "womens" ? <hr /> : <></>}

                </li>



                <li onClick={() => setMenu("kids")}>

                    <Link
                        to="/kids"
                        style={{ textDecoration: "none" }}
                    >
                        Kid
                    </Link>

                    {menu === "kids" ? <hr /> : <></>}

                </li>

            </ul>



            <div className="nav-login-cart">

                {
                    token ? (

                        <button style={{backgroundColor:"red", color:'white'}} onClick={logoutHandler}>
                            Logout
                        </button>

                    ) : (

                        <Link to="/login">

                            <button>
                                Login
                            </button>

                        </Link>

                    )
                }



                <Link to="/cart">

                    <img src={cart_icon} alt="" />

                </Link>



                <div className="nav-cart-count">

                    {getTotalCartItems()}

                </div>

            </div>

        </div>

    );

}



export default NavBar;