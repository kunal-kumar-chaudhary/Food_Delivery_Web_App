"use client";
import React, { useState, useEffect } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();

    const [myOrders, setMyOrders] = useState([]);

    // function will be called first time when component is mounted
    useEffect(()=>{
        getMyOrders();
    },[]);

    const getMyOrders = async()=>{
        const deliveryData = JSON.parse(localStorage.getItem("delivery"));
            let response = await fetch(`http://localhost:3000/api/deliverypartners/orders/${deliveryData._id}`)
            let data = await response.json();
            if (data.success){
                setMyOrders(data.result);
            }
    }



  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("delivery"));
    if (!delivery) {
      router.push("/deliverypartner");
    }
  }, []);

  return (
    <div>
      <DeliveryHeader />
      <h1>My Order List</h1>
      {
            myOrders.map((item)=>(<div className='restaurant-wrapper'
            >
                <h4>Name: {item.data.name}</h4>
                <div>Amount: {item.amount}</div>
                <div>Address: {item.data.address}</div>
                <div>Status: {item.status}</div>
            </div>))
        }
    </div>
  );
};

export default page;
