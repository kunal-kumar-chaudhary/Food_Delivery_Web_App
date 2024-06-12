"use client";
import RestaurantHeader from '@/app/_components/RestaurantHeader'
import React from 'react'
import "../style.css"
import AddFootItem from '@/app/_components/AddFootItem'
import { useState } from 'react';
import FoodItemList from '@/app/_components/FoodItemList';

const page = () => {
    const [addItem, setAddItem] = useState(false);

  return (
    <div>
        <RestaurantHeader />
        <button onClick={()=>setAddItem(true)}>Add food</button>
        <button onClick={()=>setAddItem(false)}>Dashboard</button>
        {
            addItem? <AddFootItem setAddItem={setAddItem}/>: <FoodItemList />
        }
    </div>
  )
}

export default page
