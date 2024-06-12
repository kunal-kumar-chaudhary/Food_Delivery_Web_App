import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFoodItems = async () => {
      const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
      const resto_id = restaurantData._id;

      try {
        const response = await fetch(
          `http://localhost:3000/api/restaurant/foods/${resto_id}`
        );
        const data = await response.json(); 
        console.log(data);
        if (data.success) {
          setFoodItems(data.result);
        } else {
          throw new Error("Failed to load food items");
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
        // Handle error here, e.g., display error message to user
        alert("Failed to load food items");
      }
    };

    fetchFoodItems();
  }, []);


  const deleteFoodItem = async (id) => {
    let response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
      method: "DELETE",
    });
    let data = await response.json();
    if (data.success) {
      let newFoodItems = foodItems.filter((item) => item._id !== id);
      setFoodItems(newFoodItems);
    }
    else{
      alert("Failed to delete food item");
    }
  }

  return (
    <div>
      <h1>food items</h1>
      <table>
        <thead>
          <tr>
            <td>S.N</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td>Image</td>
            <td>Operations</td>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, key) => (
            <tr key={key}>
              <td>{key+1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td><img src={item.img_path}/></td>
              <td>
                <button onClick={()=>deleteFoodItem(item._id)}>Delete</button>
                <button onClick={()=>router.push(`dashboard/${item._id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
