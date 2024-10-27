import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
const MyOrders = () => {
    const [data, setData] = useState([]);
    const updateData = (x)=>{
        setData(x);
    }
    const { url, token } = useContext(StoreContext);
    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            if(response.data.success){
            updateData(response.data.data);}
        } catch (error) {
            console.log("Error:" + error);

        }
    }
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order,index)=>{
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item,index)=>{
                                if(index === order.items.length-1){
                                    return item.name+" x "+ item.quantity
                                }
                                else{
                                    return item.name+" x "+ item.quantity+","
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span> &#8226;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default MyOrders

