import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const RestaurantLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    let response = await fetch("http://localhost:3000/api/restaurant",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          login: true,
        }),
      }
    )

    let data = await response.json();
    if (data.success){
      const {result} = data;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
    else{
      alert("login failed");
    }
  }
  
  return (
    <>
      <h3>Login</h3>
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
            error && !password && <span className="input-error">Password is required</span>
          }
        </div>
        <div className="input-wrapper">
          <button onClick={handleLogin} className="button">Login</button>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
