import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';

const LoginPopup= ( {setShowLogin} )=> {
    const [currState , setCurrState ]= useState('Login'); 
   
    return (
    <div className='login-popup'>
        <form action="" className='login-popup-container'>
            <div className='login-popup-title'>
                <h2> {currState}</h2>
                <img onClick={()=>setShowLogin(false)}src={assets.cross_icon}/> 
            </div>
            {currState === 'Login'?<p>Create a new account? <span onClick={()=> setCurrState('Sign Up')}> Click here </span></p>:<p>Already have an account? <span onClick={()=> setCurrState('Login')}>Login Here</span></p>}
            <div className="login-popup-inputs">
                { currState=== 'Login'? <></> : <input type="text" placeholder='Your Name ' required />}
                
                <input type="email" placeholder='Your email ' required />
                <input type="password" placeholder='Your password ' required />
            </div>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing , i agree to the terms of use and privacy policy </p>

            </div>
            <button>{currState==='Sign Up'? "create account" : "signin"}</button>
            
            
            
        </form>
      
    </div>
  )
}

export default LoginPopup
