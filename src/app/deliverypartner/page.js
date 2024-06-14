"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryHeader from "../DeliveryHeader";

const page = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
            const delivery = JSON.parse(localStorage.getItem("delivery"));
            if (delivery) {
              router.push("/deliverydashboard");
            }
  }, []);

  const handleLogin = async () => {
    let response = await fetch(
      `http://localhost:3000/api/deliverypartners/login`,
      {
        method: "POST",
        body: JSON.stringify({
          mobile: loginMobile,
          password: loginPassword,
        }),
      }
    );
    let data = await response.json();
    if (data.success) {
      const { result } = data;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push("/deliverydashboard");
    } else {
      alert("User Login failed");
    }
  };

  const handleSignUp = async () => {
    let response = await fetch(
      `http://localhost:3000/api/deliverypartners/signup`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          mobile,
          password,
          city,
          address,
        }),
      }
    );
    let data = await response.json();
    if (data.success) {
      const { result } = data;
      // deleting the password
      //   delete result.password;
      console.log(result);
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push("/deliverydashboard");
    } else {
      alert("User SignUp failed");
    }
  };

  return (
    <div>
      <DeliveryHeader />
      <h1>delivery partner</h1>
      <div className="auth-container">
        <div className="login-wrapper">
          <h3>Login</h3>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter mobile number"
              value={loginMobile}
              onChange={(e) => setLoginMobile(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Enter Password"
              className="input-field"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <button onClick={handleLogin} className="button">
              Login
            </button>
          </div>
        </div>

        {/* signup below */}

        <div className="signup-wrapper">
          <h3>SignUp</h3>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter Contact Number"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
            />
          </div>

          <div className="input-wrapper">
            <button onClick={handleSignUp} className="button">
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
