import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const StoreContext = createContext(null);
// import { food_list } from "../assets/assets";
const StoreContextProvider =(props)=>{

    const [cartItems,setCartItems]=useState({});
    const url = 'http://localhost:3000';
    const [token,setToken] = useState('') 
    const [food_list,setfoodList]=useState([]);

    const addToCart = async (itemId)=>{
            if(!cartItems[itemId]){
                setCartItems((prev)=>({...prev,[itemId]:1}))
            }
            else{
                setCartItems((prev)=> ({...prev,[itemId]:prev[itemId]+1}))
            }
            if(token){
                await axios.post(url+'/api/cart/add',{itemId},{headers: {token}})
            }

    }
    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers: {token}});
        setCartItems(response.data.cartData);
    }
    // this function should be called each time when we reload our website.
    const fetchFoodList = async()=>{
        const response = await axios.get(url+'/api/food/list');
        setfoodList(response.data.data);

    }
    useEffect(()=>{
        console.log(cartItems)
    } ,[cartItems])
    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]: prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item])
                {
                    let itemInfo = food_list.find((product)=> product._id === item );
                    totalAmount+= itemInfo.price* cartItems[item];
                }
        }
        return totalAmount
    }
    useEffect(()=>{
            async function loadData(){
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
            }}
            loadData();
        }
        
    ,[]);
    useEffect(()=>{
        fetchFoodList();

    },[food_list]);

    const contextValue = {
        food_list,
        cartItems,
        url,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
    // return (
    //     <StoreContext.Provider value ={coontextValue}>
    //         {props.children}
    //     </StoreContext.Provider>
    // )
}
export default StoreContextProvider;

