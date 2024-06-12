"use client";
import React from "react";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { useState, useEffect } from "react";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";

const page = () => {
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
  return (
    <div>
      <CustomerHeader />
      <div className="food-item-wrapper">
        {cartStorage.length > 0 ? (
          cartStorage?.map((item) => (
            <div className="list-item">
              <div className="list-item-block-1">
                <img src={item.img_path} />
              </div>
              <div className="list-item-block-2">
                <div>{item.name}</div>

                <div classNa me="description">
                  {item.description}
                </div>
                {
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove from cart
                  </button>
                }
              </div>
              <div className="list-item-block-3">Price: {item.price}</div>
            </div>
          ))
        ) : (
          <h1>No food item added for now</h1>
        )}
      </div>
      <div className="total-wrapper">
        <div className="block-1">
          <div className="row">
            <span>Food Charges : </span>
            <span>{total}</span>
          </div>
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
        </div>
        <div className="block-2">
          <button>Order Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
