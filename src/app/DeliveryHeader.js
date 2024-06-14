"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DeliveryHeader = (props) => {

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
      </ul>
    </div>
  );
};

export default DeliveryHeader;
