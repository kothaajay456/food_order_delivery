import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import "./index.css"
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlacedOrder from './Pages/PlacedOrder/PlacedOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './Pages/Verify/verify.jsx'
import Myorders from './Pages/Myorders/Myorders.jsx'
const App = () => {
   const [showlogin ,setshowlogin]=useState(false);
  return (
   
    <>
    {showlogin?<LoginPopup setshowlogin={setshowlogin}/>:<></>}
    <div className='app'>
      <Navbar setshowlogin={setshowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlacedOrder/>}/>
          <Route path='/verify' element={<Verify />}/>
        <Route path='/myorders' element={<Myorders/>}/>
      </Routes>

    </div>
    <Footer/>
    </>
  )
}

export default App
