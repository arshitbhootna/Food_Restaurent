import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import {Route , Routes} from 'react-router-dom'
import './index.css'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/Placeorder.jsx'
import Footer from './components/Footer/Footer.jsx'

const App = () => {
  return (
    <>
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
    <Footer/> 
    </>
  )
}

export default App
