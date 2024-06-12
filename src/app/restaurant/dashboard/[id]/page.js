"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditFootItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();


  const handleLoadFoodItem = async () => {

    let response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`);
    let data = await response.json()
    if(data.success){
        setName(data.result.name);
        setPrice(data.result.price);
        setPath(data.result.img_path);
        setDescription(data.result.description);
    }
    else{
        alert("Failed to load food item");
    }
  }

  useEffect(() => {
    handleLoadFoodItem();
  }, []);


  const handleEditFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    console.log(name, price, path, description);
    let response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`,
        { 
            method: "PUT",
            body: JSON.stringify({name, price, img_path: path, description})
        }
    );
    let data = await response.json();
    if (data.success){
        router.push("../dashboard");
    }
    else{
        alert("failed to update the food item");
    }
  };

  return (
    <div className="container">
      <h1>Update food item</h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter food name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="input-error">Name is required</span>
        )}
      </div>

      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter price"
          className="input-field"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className="input-error">Price is required</span>
        )}
      </div>

      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter image path"
          className="input-field"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        {error && !path && (
          <span className="input-error">Image path is required</span>
        )}
      </div>

      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter food description"
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && !description && (
          <span className="input-error">Description is required</span>
        )}
      </div>

      <div className="input-wrapper">
        <button className="button" onClick={handleEditFoodItem}>
          Update Food Item
        </button>
      </div>

      <div className="input-wrapper">
        <button
          className="button"
          onClick={() => router.push(`../dashboard`)}
        >
          Back to Food Item list
        </button>
      </div>  
    </div>
  );
};

export default EditFootItem;
