"use client";
import React from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("delivery"));
    if (!delivery) {
      router.push("/deliverypartner");
    }
  }, []);

  return (
    <div>
      <DeliveryHeader />
      <h1>delivery dashboard</h1>
    </div>
  );
};

export default page;
