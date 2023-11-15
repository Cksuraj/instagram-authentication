import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

export default function Signin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/signin",                       // Backend url to feth data from Database 
        {
          username,
          password,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Check if 'response' and 'response.data' are defined
      if (response && response.data) {
        if (response.data.success) {
          // Redirect to the home page
          navigate("/");
        } else {
          // Login failed, display an error message
          toast.error(response.data.error);
        }
      } else {
        // Handle the case where 'response' or 'response.data' is undefined
        console.error("Invalid response format:", response);
        toast.error("Invalid username and Password");
      }
    } catch (error) {
      // Handle network errors or errors from the server
      console.error("Login error:", error);
  
      // Check if 'error.response' and 'error.response.data' are defined
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Invalid username and password");
      }
    }
  };
  

  return (
    <div className="instasign">
    <form className="container flex in" id="login-form" onSubmit={handleSubmit}>
      <ToastContainer/>
      <h1>Instagram Signin</h1>
      <div className="input-box flex">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}        // Onchange event  setting the username using usestate
        />
      </div>
      <div className="input-box flex">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}        // onchange event changing the state 
        />
      </div>
      <button type="submit">Sign in</button>
      <div className="forgot flex">
        <span>Forgot Password?</span>
        <NavLink  to="/signup"> <h4 className="signup">Signup</h4></NavLink>
      </div>
    </form>
    </div>
  );
}
