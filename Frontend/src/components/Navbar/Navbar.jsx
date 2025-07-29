import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({setshowlogin}) => {
    const [menu,setMenu]=useState("Home");
    const {getTotalcartAmount,token,settoken}=useContext(StoreContext);
    const navigate=useNavigate();
    const logout =()=>{
    localStorage.removeItem("token");
    settoken("");
    navigate("/")
    }
  return (
    <div className='Navbar'>
     <Link to="/"> <img src={assets.logo} alt="Logo" className='logo'/></Link>
      <ul className='navbar-menu'>
       <Link to='/' onClick={()=>setMenu("Home")} className={menu==='Home' ? 'active':''}>Home</Link>
       <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu==='Menu'  ? 'active':''}>Menu</a>
       <a href='#app-download' onClick={()=>setMenu("Mobile-App")} className={menu==='Mobile-App'  ? 'active':''}>Mobile-App</a>
       <a href='#footer' onClick={()=>setMenu("Contact-Us")} className={menu==='Contact-Us'  ? 'active':''}>Contact-Us</a>
      </ul>
      <div className='navbar-right'>
        {/* <input type="text" placeholder='search'/> */}
        <img src={assets.search_icon} alt="search-icon" />
        <div className='navbar-right-icon'>
           <Link to='/cart'> < img src={assets.basket_icon} alt="Basket-Icon" /> </Link>
            <div className={getTotalcartAmount()===0?"":"dot"}> </div>
        </div>
        {!token? <button onClick={()=>setshowlogin(true)}>Sign in</button>
        :
        <div className='navbar-profile'>
         <img src={assets.profile_icon} alt="" />
         <ul className="nav-profile-dropdown">
          <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
          <hr />
          <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
         </ul>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar
