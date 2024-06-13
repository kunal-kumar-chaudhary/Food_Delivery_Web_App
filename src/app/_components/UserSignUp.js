import { useRouter } from "next/navigation";
import { useState } from "react";
const UserSignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    let response = await fetch(`http://localhost:3000/api/user`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        city,
        address,
        mobile,
      }),
    });
    let data = await response.json();
    if (data.success) {
      const { result } = data;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      // if we have the order in the params, the user will be redirected to /order page
      if (props?.redirect?.order) {
        router.push("/order");
      } else {
        // else, we will redirect the user to the home page
        router.push("/");
      }
    } else {
      alert("User SignUp failed");
    }
  };

  return (
    <div>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
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
        <input
          type="text"
          className="input-field"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter Contact Number"
        />
      </div>
      <div className="input-wrapper">
        <button onClick={handleSignUp} className="button">
          SignUp
        </button>
      </div>
    </div>
  );
};

export default UserSignUp;
