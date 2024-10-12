import React, { useContext } from 'react'
import './placeorder.css'
import { StoreContext } from '../../Context/StoreContext'
const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(StoreContext);
  return (

    <div>
        <form action="" className='place-order'>
          <div className="place-order-left">
            <p className="title">
              Delivery Information
            </p>
            <div className="multi-fields">
              <input type="text" placeholder='First Name' />
              <input type="text" placeholder='Last Name' />
            </div>
            <input type="email" placeholder='email address' />
            <input type="text" placeholder='Street' />
            <div className="multi-fields">
              <input type="text " placeholder='city' />
              <input type="text" placeholder='state'/>

            </div>
            <div className="multi-fields">
              <input type="text " placeholder='Zip code' />
              <input type="text" placeholder='Country'/>
            </div>
            <input type="text" placeholder='Phone' />

          </div>
          <div className="place-order-right">
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
            <b>${getTotalCartAmount()+2}</b>
          </div>
        <button onClick={()=> navigate('/order')}>Proceed to Payment</button>
        </div>
          </div>
        </form>
    </div>
  )
}
export default PlaceOrder;
