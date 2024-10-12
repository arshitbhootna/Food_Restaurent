import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import {Route , Routes} from 'react-router-dom'
import './index.css'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/Placeorder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'

const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  return (
    <>
    { showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
    <Footer/> 
    </>
  )
}

export default App
