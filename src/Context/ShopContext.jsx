import { createContext, useEffect, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [all_product, setAllProduct] = useState([]);

    const [cartItems, setCartItems] = useState({});


   useEffect(() => {

    const fetchProductsAndCart = async () => {

        try {

            
            const response = await axios.get(
                `${backendUrl}/api/products`
            );

            setAllProduct(response.data.products);

            const cart = {};

            response.data.products.forEach((product) => {
                cart[product.id] = 0;
            });

            const userId = localStorage.getItem("userId");

            if (userId) {

                const cartResponse = await axios.get(
                    `${backendUrl}/api/cart/${userId}`
                );

                if (
                    cartResponse.data.cart &&
                    cartResponse.data.cart.items
                ) {

                    cartResponse.data.cart.items.forEach((item) => {

                        cart[item.productId] = item.quantity;

                    });

                }

            }

            setCartItems(cart);
           
        } catch (error) {

            console.log(error);
            


        }

    };

    fetchProductsAndCart();

}, []);

   const addToCart = async (itemId) => {

    const userId = localStorage.getItem("userId");

    if (!userId) {

        alert("Please Login First");

        return;

    }

    try {

        await axios.post(
            `${backendUrl}/api/cart/add`,
            {
                userId,
                productId: itemId,
            }
        );

        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

    } catch (error) {

        console.log(error);

    }

};


  const removeFromCart = async (itemId) => {

    const userId = localStorage.getItem("userId");

    if (!userId) {

        return;

    }

    try {

        await axios.post(
            `${backendUrl}/api/cart/remove`,
            {
                userId,
                productId: itemId,
            }
        );

        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
        }));

    } catch (error) {

        console.log(error);

    }

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