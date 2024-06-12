"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";
export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    let response = await fetch(`http://localhost:3000/api/customer/locations`);
    let data = await response.json();
    if (data.success) {
      setLocations(data.result);
    }
  };

  const loadRestaurants = async (params) => {
    let url =  `http://localhost:3000/api/customer`;
    if(params?.location){
      url = url + "?location="+params.location;
    }
    else if (params?.restaurant){
      url = url + "?restaurant="+ params.restaurant;
    }

      let response = await fetch(url);
      let data = await response.json();
      if (data.success){
        setRestaurants(data.result);
    }
  
  }

  const handleListItem = (e) => {
    setSelectedLocation(e.target.innerText);
    setShowLocation(false);
    loadRestaurants({location:e.target.innerText});
  };

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            value={selectedLocation}
            onClick={() => setShowLocation(true)}
            className="select-input"
            placeholder="Select place"
          />
          <ul className="location-list">
            {showLocation &&
              locations.map((location) => (
                <li onClick={handleListItem}>{location}</li>
              ))}
          </ul>
          <input
            type="text"
            className="search-input"
            onChange={(e)=>loadRestaurants({restaurant:e.target.value})}
            placeholder="Enter food or restaurant name"
          />
        </div>
      </div>
      <div className="restaurant-list-container">
      {
        restaurants.map((restaurant)=>(
          <div onClick={()=>router.push("explore/"+restaurant.name+"?id="+restaurant._id)} className="restaurant-wrapper">
            <div className="heading-wrapper">
            <h3>{restaurant.name}</h3>
            <h5>Contact: {restaurant.contact}</h5>
            </div>
            <div className="address-wrapper">
                <div>{restaurant.city}</div>
                <div>, {restaurant.address}</div>
            </div>
          </div> 
        ))
      }
      </div>
      <Footer />
    </main>
  );
}
