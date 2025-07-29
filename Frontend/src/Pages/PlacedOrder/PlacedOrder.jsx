import React, { useContext, useEffect } from 'react'
import './PlacedOrder.css'
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PlacedOrder = () => {
  const { getTotalcartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [ data, setdata ]= useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangehander = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data => ({ ...data, [name]: value }));
  }
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalcartAmount() + 2,
    }
    console.log("Placing order with data:", orderData);

    let res = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (res.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    }
    else
    {
      alert("Error");
    }
  }
  const navigate=useNavigate();
  useEffect(()=>{
 if(!token)
 {
  navigate('/cart')
 }
 else if(getTotalcartAmount()===0)
 {
  navigate("/cart");
 }
  },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input name='firstname' onChange={onChangehander} value={data.firstname} type="text" placeholder='First name' required />
          <input name='lastname' onChange={onChangehander} value={data.lastname} type="text" placeholder='Last name' required />
        </div>
        <input name='email' onChange={onChangehander} value={data.email} type="text" placeholder='Email Address' required />
        <input type="text" name="street" onChange={onChangehander} value={data.street} placeholder='street' required />
        <div className="multi-fields">
          <input name='city' value={data.city} onChange={onChangehander} type="text" placeholder='City' required />
          <input name='state' value={data.state} onChange={onChangehander} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name='zipcode' value={data.zipcode} onChange={onChangehander} type="text" placeholder='Zip Code' required />
          <input name='country' onChange={onChangehander} value={data.country} type="text" placeholder='Country' required />
        </div>
        <input name='phone' value={data.phone} onChange={onChangehander} type="text" placeholder='phone' required />
      </div>
      <div className='place-order-right'>
        <div className="cart-total">
          <h2>To be Paid:</h2>
          <div>
            <div className='cart-total-details'>
              <p>SubTotal</p>
              <p>${getTotalcartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalcartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>${getTotalcartAmount() === 0 ? 0 : getTotalcartAmount() + 2}</p>
            </div>
            <hr />
          </div>
          <button type='submit' >Process to payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlacedOrder
