import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RestaurantSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const handleSignup = async ()=>{
    if(password !== confirmPassword){
      setPasswordError(true);
      return; 
    }
    else{
      setPasswordError(false);
    }

    if (!email || !password || !name || !city || !address || !contact || !confirmPassword){
      setError(true);
      return;
    }
    else{
      setError(false); 
    }

      let response = await fetch("http://localhost:3000/api/restaurant", {
          method: "POST",
          body: JSON.stringify({
              email,
              password,
              name,
              city,
              address,
              contact,
          }),
      })
      let data = await response.json();
      console.log(data);
      if (data.success){
        const {result} = data;
        delete result.password;
        localStorage.setItem("restaurantUser", JSON.stringify(result));
        router.push("/restaurant/dashboard");
      }
      
  }

  return (
    <>
      <h3>SignUp</h3>
      <div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="enter email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {
            error && !email && <span className="input-error">Email is required</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="enter password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {
            passwordError && <span className="input-error">Password and confirmed password didn't match</span>
          }
          {
            error && !password && <span className="input-error">Password is required</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="confirm password"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
           {
            passwordError && <span className="input-error">Password and confirmed password didn't match</span>
          }
          {
            error && !confirmPassword && <span className="input-error">Please enter valid password</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="enter restaurant name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {
            error && !name && <span className="input-error">please enter name</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="enter city"
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {
            error && !city && <span className="input-error">Please enter city</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="enter full adress"
            className="input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {
            error && !address && <span className="input-error">Please enter adress</span>
          }
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            placeholder="enter contact number"
            className="input-field"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {
            error && !contact && <span className="input-error">Please enter contact number</span>
          }
        </div> 
        <div className="input-wrapper">
          <button onClick={handleSignup} className="button">SignUp</button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignUp;
