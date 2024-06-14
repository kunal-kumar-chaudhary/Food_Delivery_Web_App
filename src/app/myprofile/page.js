"use client";
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import Footer from '../_components/Footer'

const page = () => {
    const [myOrders, setMyOrders] = useState([]);
    const userStorage = JSON.parse(localStorage.getItem("user"));

    // function will be called first time when component is mounted
    useEffect(()=>{
        getMyOrders();
    },[]);

    const getMyOrders = async()=>{
            let response = await fetch(`http://localhost:3000/api/order?id=${userStorage._id}`)
            let data = await response.json();
            if (data.success){
                setMyOrders(data.result);
            }
    }

  return (
    <div>
      <CustomerHeader/>
        {
            myOrders.map((item)=>(<div className='restaurant-wrapper'
            style={{marginLeft:"auto", marginRight:"auto"}}>
                <h4>Name: {item.data.name}</h4>
                <div>Amount: {item.amount}</div>
                <div>Address: {item.data.address}</div>
                <div>Status: {item.status}</div>
            </div>))
        }
      <Footer/>
    </div>
  )
}

export default page
