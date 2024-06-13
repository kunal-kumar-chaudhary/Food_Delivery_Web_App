import React, { useState } from "react";
import {useRouter} from "next/navigation";

const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    let response = await fetch(`http://localhost:3000/api/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password, 
      }),
    });
    let data = await response.json();
    if (data.success) {
      const { result } = data;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if(props?.redirect?.order){
            router.push("/order");
      }
      else{
        router.push("/");
      }
      
    } else {
      alert("User Login failed");
    }
  };

  return (
    <div>
      <div className="input-wrapper">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="Enter Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <button onClick={handleLogin} className="button">
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
