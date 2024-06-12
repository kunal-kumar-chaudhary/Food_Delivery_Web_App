"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import React, { useState, useEffect } from "react";
import Footer from "@/app/_components/Footer";

const page = (props) => {
  const [restaurantDetails, setRestaurantDetails] = useState(); // single details
  const [foodItems, setFoodItems] = useState([]); // multiple details
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [cartIds, setCartIds] = useState(cartStorage? () =>
    cartStorage.map((item) => {
      return item._id;
    }): []
  );

  const [removeCartData, setRemoveCartData] = useState();

  useEffect(() => {
    loadRestaurantDetails();
  }, []);
  console.log(cartIds);
  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;

    let response = await fetch(`http://localhost:3000/api/customer/${id}`);
    const data = await response.json();
    if (data.success) {
      console.log(data);
      setRestaurantDetails(data.details);
      setFoodItems(data.foodDetails);
    }
  };

  const name = props.params.name;
  const addToCart = (item) => {
    setCartData(item);
    let localCartIds = cartIds;
     localCartIds.push(item._id);
      setCartIds(localCartIds);
      setRemoveCartData();
  };

  const removeFromCart = (id) => {
            setRemoveCartData(id);
            var localIds = cartIds.filter((item) => item !== id);
            setCartData();
            setCartIds(localIds);
  }

  return (
    <div>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div className="detail-wrapper">
        <h3>Contact: {restaurantDetails?.contact}</h3>
        <h3>City: {restaurantDetails?.city}</h3>
        <h3>Address: {restaurantDetails?.address}</h3>
        <h3>Email: {restaurantDetails?.email}</h3>
      </div>
      <div className="food-item-wrapper">
        {foodItems.length > 0 ? (
          foodItems?.map((item) => (
            <div className="list-item">
              <img src={item.img_path} />
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div classNa me="description">{item.description}</div>
                {cartIds.includes(item._id) ? (
                  <button onClick={()=>removeFromCart(item._id)}>Remove from cart</button>
                ) : (
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No food item added for now</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default page;
