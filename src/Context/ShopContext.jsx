import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [all_product, setAllProduct] = useState([]);

    const [cartItems, setCartItems] = useState({});


    useEffect(() => {

        fetch("http://localhost:3200/api/products")

            .then((response) => response.json())

            .then((data) => {

                setAllProduct(data.products);

                const cart = {};

                data.products.forEach((product) => {
                    cart[product.id] = 0;
                });

                setCartItems(cart);

            })

            .catch((error) => {
                console.log("Error fetching products:", error);
            });

    }, []);


    const addToCart = (itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

    };


    const removeFromCart = (itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
        }));

    };


    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {

                const itemInfo = all_product.find(
                    (product) => product.id === Number(item)
                );

                if (itemInfo) {
                    totalAmount +=
                        itemInfo.new_price * cartItems[item];
                }

            }

        }

        return totalAmount;
    };


    const getTotalCartItems = () => {

        let totalItem = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }

        }

        return totalItem;
    };


    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart
    };


    return (

        <ShopContext.Provider value={contextValue}>

            {props.children}

        </ShopContext.Provider>

    );
};


export default ShopContextProvider;