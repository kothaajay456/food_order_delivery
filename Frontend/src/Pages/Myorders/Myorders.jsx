import React, { useContext, useEffect, useState } from 'react';
import './Myorders.css';
import { StoreContext } from '../../context/StoreContext';
import {assets} from '../../assets/assets.js'; 
import axios from 'axios';

const Myorders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(url + '/api/order/userorders', {}, {
                headers: { token },
            });
            setData(res.data.data);
        } catch (err) {
            setError('Failed to fetch orders.');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {loading && <p>Loading your orders...</p>}
                {error && <p className='error'>{error}</p>}
                {!loading && data.length === 0 && <p>No orders found.</p>}

                {data.map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="parcel" />
                        <p>{order.items.map(item => `${item.name}x${item.quantity}`).join(', ')}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p className={`status ${order.status.toLowerCase()}`}>
                            <span>&#x25cf;</span> <b>{order.status}</b>
                        </p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Myorders;
