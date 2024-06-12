import React from "react";
import { useState } from "react";

const AddFootItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleAddFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return;
    }
    else{
        setError(false);
    }

    let resto_id;
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    
    if(restaurantData){
        resto_id = restaurantData._id;
    }

    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        img_path: path,
        description,
        resto_id,
      }),
    });

    let data = await response.json();
    if (data.success){
        alert("food item added");
        props.setAddItem(false);
    }
    else{
        alert("failed to add food item");
    }
  }

  return (
    <div className="container">
      <h1>Add new food item</h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter food name"
          className="input-field"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        {
            error && !name && <span className="input-error">Name is required</span>
        }
      </div>

      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter price"
          className="input-field"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />
        {
            error && !price && <span className="input-error">Price is required</span>
        }
      </div>

      <div className="input-wrapper">
        <input 
          type="text"
          placeholder="enter image path"
          className="input-field"
          value={path}
          onChange={(e)=>setPath(e.target.value)}
        />
        {
            error && !path && <span className="input-error">Image path is required</span>
        }
      </div>

      <div className="input-wrapper">
        <input
          type="text" 
          placeholder="enter food description"
          className="input-field"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
        {
            error && !description && <span className="input-error">Description is required</span>
        }
      </div>

      <div className="input-wrapper">
        <button className="button"
        onClick={handleAddFoodItem}>
            Add Food Item
        </button>
      </div>

    </div>
  );
};

export default AddFootItem;
