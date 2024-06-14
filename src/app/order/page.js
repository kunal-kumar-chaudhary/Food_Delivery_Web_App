"use client";
import React from "react";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { useState, useEffect } from "react";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [removeCartData, setRemoveCartData] = useState(false);
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [total] = useState(() =>
    cartStorage?.length === 1
      ? cartStorage[0].price
      : cartStorage?.reduce((a, b) => {
          return a.price + b.price;
        })
  );

  useEffect(() => {
        if(!total){
            router.push("/");
        }
  }, [total]);

  const orderNow = async () => {
    let userId = JSON.parse(localStorage.getItem("user"))._id;
    let city = JSON.parse(localStorage.getItem("user")).city;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let resto_id = cart[0].resto_id;
    let deliveryBoyRespose = await fetch(`http://localhost:3000/api/deliverypartners/${city}`);
    deliveryBoyRespose = await deliveryBoyRespose.json();
    let deliveryBoyIds = deliveryBoyRespose.result.map((item)=> item._id);
    let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random()* deliveryBoyIds.length)]
    if(!deliveryBoy_id){
        alert("no delivery partner available");
        return false;
    }
    let foodItemIds = cart.map((item)=> item._id).toString(); // stringifyig the array of ids

    let collection = {
        userId,
        foodItemIds,
        resto_id,
        deliveryBoy_id,
        status: "confirmed", 
        amount: total+DELIVERY_CHARGES+(total*TAX)/100,
    }
    console.log(collection);

    let response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        body: JSON.stringify(collection),
    });
    let data = await response.json();
    if (data.success){
        alert("Order placed successfully");
        setRemoveCartData(true);
        router.push("myprofile");
    }
    else{
        alert("Failed to place order");
    }

  }


  return (
    <div>
      <CustomerHeader removeCartData={removeCartData} />
      <div className="total-wrapper">
        <div className="block-1">
            <h2>User Details</h2>
          <div className="row">
            <span>Name : </span>
            <span>{userStorage.name}</span>
          </div>
          <div className="row">
            <span>Address : </span>
            <span>{userStorage.address}</span>
          </div>
          <div className="row">
            <span>Mobile : </span>
            <span>{userStorage.mobile }</span>
          </div>
          <h2>Amount Details</h2>
          <div className="row">
            <span>Tax : </span>
            <span>{(total * TAX) / 100}</span>
          </div>
          <div className="row">
            <span>Delivery Charges : </span>
            <span>{DELIVERY_CHARGES}</span>
          </div>
          <div className="row">
            <span>Total Amount : </span>
            <span>{total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
          </div>
          <h2>Payment Methods</h2>
          <div className="row">
            <span>Cash On Delivery : </span>
            <span>{total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={orderNow}>Place Your Order Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
