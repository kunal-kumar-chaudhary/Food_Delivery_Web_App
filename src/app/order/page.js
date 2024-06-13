"use client";
import React from "react";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { useState, useEffect } from "react";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";

const page = () => {

    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [total] = useState(() =>
    cartStorage.length === 1
      ? cartStorage[0].price
      : cartStorage.reduce((a, b) => {
          return a.price + b.price;
        })
  );

  const orderNow = async () => {
    let user_id = JSON.parse(localStorage.getItem("user"))._id;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let resto_id = cart[0].resto_id;
    let deliveryBoy_id = "660c42156c1b5373566d55bc"; 
    let foodItemIds = cart.map((item)=> item._id).toString(); // stringifyig the array of ids

    let collection = {
        user_id,
        resto_id,
        foodItemIds,
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
    }
    else{

    }

  }


  return (
    <div>
      <CustomerHeader />
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
