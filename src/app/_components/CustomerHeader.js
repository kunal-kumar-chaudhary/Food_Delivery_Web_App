import React, { useEffect, useState } from "react";
import Link from "next/link";

const CustomerHeader = (props) => {
  const cartStorage = JSON.parse(localStorage.getItem("cart"));
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);

  useEffect(() => {
    if (props.cartData) {
      if (cartNumber) {
        // if the new id is different from the current restaurant id, all the items from cart will be removed
        if (cartItem[0].resto_id != props.cartData.resto_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
        } else {
          let localCartItem = cartItem;
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("cart", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);

  useEffect(()=>{
      if(props.removeCartData){
        let localCartItem = cartItem.filter((item)=>{
            return item._id !== props.removeCartData;
        });
        setCartItem(localCartItem); 
        setCartNumber(cartNumber - 1); 
        localStorage.setItem("cart", JSON.stringify(localCartItem))
        // if the length of cart has become zero, we will remove the cart 
        if (localCartItem.length === 0){
          localStorage.removeItem("cart")
        }
      }

  }, [props.removeCartData]);

  return (
    <div className="header-wrapper">
      <div className="logo ">
        <img
          style={{ width: 100 }}
          src="http://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/">Login</Link>
        </li>
        <li>
          <Link href="/">SignUp</Link>
        </li>
        <li>
          <Link href={cartNumber?"/cart":"#"}>Cart({cartNumber ? cartNumber : 0})</Link>
        </li>
        <li>
          <Link href="/">Add Restaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
