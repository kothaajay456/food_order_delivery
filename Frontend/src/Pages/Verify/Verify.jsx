import React from 'react'
import './Verify.css'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'
const Verify = () => {
    const [searchParams, setsearchparam] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!orderId || orderId === "undefined") {
            console.error("Invalid or missing orderId:", orderId);
            navigate("/");
            return;
        }
        verifypayment();
    }, []);

    const verifypayment = async () => {
        const res = await axios.post(url + "/api/order/verify", { success, orderId });
        if (res.data.success) {
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }
    useEffect(() => {
        verifypayment();
    }, []);
    return (
        <div className='verify'>
            <div className='spinner'>
            </div>
        </div>
    )
}

export default Verify;
