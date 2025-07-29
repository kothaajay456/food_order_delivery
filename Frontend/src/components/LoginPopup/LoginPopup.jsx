import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setshowlogin }) => {
  const {url,token,settoken}=useContext(StoreContext);
  const [currstate, setcurrstate] = useState("Login");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const Onchangehandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data => ({
      ...data, [name]: value
    }))
  };
  // useEffect(()=>{
  // console.log(data);
  // },[data]);
  const onlogin=async(event)=>{
   event.preventDefault();
   let newurl=url;
   if(currstate==="Login")
   {
    newurl +="/api/user/login";
   }
   else
   {
    newurl +="/api/user/register";
   }
   const res=await axios.post(newurl,data);
   if(res.data.success)
   {
     settoken(res.data.token);
     localStorage.setItem("token",res.data.token);
     setshowlogin(false);
   }
   else
   {
    alert(res.data.message);
   }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onlogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>
            {currstate}
          </h2>
          <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popup-inputs'>
          {currstate === "Login" ? <></> : <input type="text" name='name' value={data.name} onChange={Onchangehandle} placeholder='Your Name' required />}
          <input type="text" name='email' value={data.email} onChange={Onchangehandle} placeholder='Your Email' required />
          <input type="text" name='password' value={data.password} onChange={Onchangehandle} placeholder='Password' required />
          {/* {currstate==="Login"?<></>:  <input type="text" placeholder='Confirm Password' required/>} */}
        </div>
        <button type='submit'>{currstate === 'Sign Up' ? "Create Account" : "Login"}</button>
        {currstate === "Login" ? <></> :
          <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p>
              By continuing,I agree to the terms and conditions.
            </p>

          </div>
        }
        {currstate === "Login" ?
          <p>
            Create a new account?  <span onClick={() => setcurrstate("Sign Up")}>Sign Up</span>
          </p>
          :
          <p>
            Already have an account? <span onClick={() => setcurrstate("Login")}>Login</span>
          </p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
