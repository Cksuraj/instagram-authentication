import React, { useEffect, useState } from "react";      // React Hooks {useEffect, useState}
import { useNavigate } from "react-router-dom";          // React Hooks {useNavigate} use to navigate user 
import axios from "axios"; 
import "./style.css";

export default function Home() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");                   // React hook State wiht empty state
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/check-auth", {
          withCredentials: true,
        });
        setUsername(response.data.username); // Update the username state
        setEmail(response.data.email); // Update the email state
        setBio(response.data.bio); // Update the bio state
      } catch (error) {
        navigate("/Signin");
      }
    };

    checkAuth();  

  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8081/Logout',                     // Handaling the call with the path
      {
        withCredentials: true 
      })
      navigate('/Signin');
    }
    catch(e) {
      alert(e.message);
    }
  }

  return (
    <>
      <button className="logout" onClick={handleLogout}>Logout</button>
      <div className="container flex user">
        <div className="profile-img">
          <img style={{borderRadius:'50%', backgroundColor:'white'}}
            src="https://cdn1.iconfinder.com/data/icons/instagram-ui-colored/48/JD-18-512.png"
            alt="profile-img"
          />
        </div>
        <div className="user-details flex">
          <span id="username">@{username}</span>
          <span id="bio">{bio}</span>
          <span id="email">{email}</span>
          <span>Followers: 599</span>
        </div>
      </div>
    </>
  );
}