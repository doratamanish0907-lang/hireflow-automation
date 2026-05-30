import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    preferredRole: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value,

    });

  };

  const saveProfile = async () => {

    try {

      await axios.post(
        "http://http://hireflow-automation.onrender.com/api/auth/login",
        {
          ...formData,
          skills: formData.skills.split(","),
        }
      );

      alert("Profile Saved Successfully");

      navigate("/jobs");

    } catch (error) {

      console.log(error);

      alert("Failed to save profile");

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111827",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      <h1>👤 User Profile</h1>

      <br />

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        style={inputStyle}
      />

      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={inputStyle}
      />

      <br /><br />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        style={inputStyle}
      />

      <br /><br />

      <input
        type="text"
        name="skills"
        placeholder="Skills (comma separated)"
        onChange={handleChange}
        style={inputStyle}
      />

      <br /><br />

      <input
        type="text"
        name="experience"
        placeholder="Experience"
        onChange={handleChange}
        style={inputStyle}
      />

      <br /><br />

      <input
        type="text"
        name="preferredRole"
        placeholder="Preferred Role"
        onChange={handleChange}
        style={inputStyle}
      />

      <br /><br />

      <button
        onClick={saveProfile}
        style={{
          padding: "12px 25px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save Profile
      </button>

    </div>
  );
}

const inputStyle = {

  width: "300px",
  padding: "12px",
  borderRadius: "5px",
  border: "none",
  color: "black",
  fontSize: "16px",

};

export default Profile;