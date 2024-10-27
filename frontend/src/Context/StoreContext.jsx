import { createContext, useEffect, useMemo, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:3000';
    const [token, setToken] = useState('');
    const [food_list, setfoodList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Failed to load cart data:", error);
        }
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + '/api/food/list');
            setfoodList(response.data.data);
        } catch (error) {
            console.error("Failed to fetch food list:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
            await fetchFoodList();
        };
        loadData();
    }, []);

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCount = prev[itemId] - 1;
            if (newCount <= 0) {
                const { [itemId]: _, ...rest } = prev; // remove item
                return rest;
            }
            return { ...prev, [itemId]: newCount };
        });
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item]) {
                const itemInfo = food_list.find((product) => product._id === item);
                if(itemInfo){
                totalAmount += itemInfo.
                price * cartItems[item];}
            }
        }
        return totalAmount;
    };

    const contextValue = useMemo(() => ({
        food_list,
        cartItems,
        url,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken
    }), [food_list, cartItems, token]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
