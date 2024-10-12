import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const {cartItems,food_list , removeFromCart,getTotalCartAmount} =  useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr/>
        {
          food_list.map((item,index)=>{
            if(cartItems[item._id]){
              return (
                <div >
                  <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price*cartItems [item._id]}</p>
                  <p className='cross' onClick={()=> removeFromCart(item._id) }>x</p>

                  </div>
                  <hr/>
                </div>
                
              )
            }
          })
        }
     </div> 
     <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>

          </div>
          <hr />
          <div className="cart-total-details">
            <p>De livery Fee</p>
            <p>{2}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()=== 0 ? 0:getTotalCartAmount()+2}</b>
          </div>
        <button onClick={()=> navigate('/order')}>Proceed to checkout</button>
        </div>
        <div className="cart-promocode">
      <div>
        <p>If yo have a promo code , enter it here</p>
        <div className="cart-promocode-input">
          <input type="text" placeholder='Enter ur promocode'  />
          <button>Submit</button>
        </div>
      </div>
     </div>
     </div>
     
    </div>
  )
}
export default Cart;
