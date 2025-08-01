import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const {
    food_list,
    cartItems,
    removefromCart,
    getTotalcartAmount,url,} = useContext(StoreContext);

    const navigate=useNavigate();
  return (

    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div  className='cart-items-title cart-items-item'>
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>$ {item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>$ {item.price * cartItems[item._id]}</p>
                    <p onClick={()=>removefromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>

              )
            }
            return null;
          })
        }
      </div>
      <div className="cart-bottom">
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
            <p>${getTotalcartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>${getTotalcartAmount()===0?0:getTotalcartAmount()+2}</p>
            </div>
            <hr />
          </div>
            <button onClick={()=>navigate('/order')}>CheckOut</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>Have Promocode,Enter here:</p>
            <div className='cart-promocode-input'>
            <input type="text" placeholder='promocode' />
            <button>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
