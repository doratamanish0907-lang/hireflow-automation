import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >

      {/* HEADER */}

      <h1
        style={{
          fontSize: "36px",
          marginBottom: "10px",
        }}
      >
        🚀 HireFlow Dashboard
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          marginBottom: "30px",
        }}
      >
        Your AI Resume Auto-Apply System is working successfully.
      </p>

      {/* BUTTONS */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >

        <Link to="/dashboard">
          <button style={buttonStyle}>
            Dashboard
          </button>
        </Link>

        <Link to="/upload-resume">
          <button style={buttonStyle}>
            Upload Resume
          </button>
        </Link>

        <Link to="/jobs">
          <button style={buttonStyle}>
            Jobs
          </button>
        </Link>

        <Link to="/profile">
          <button style={buttonStyle}>
            Profile
          </button>
        </Link>

        <Link to="/history">
          <button style={buttonStyle}>
            History
          </button>
        </Link>

        <button
          onClick={handleLogout}
          style={logoutButton}
        >
          Logout
        </button>

      </div>

      {/* MAIN CARD */}

      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          border: "1px solid #334155",
        }}
      >

        <h2
          style={{
            marginBottom: "15px",
          }}
        >
          Welcome Back 👋
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: "28px",
          }}
        >
          Manage your AI Resume Analyzer, Auto Apply Bot,
          Resume Parsing, Naukri Automation,
          and Smart Job Tracking System from here.
        </p>

      </div>

    </div>
  );
}

/* BUTTON STYLE */

const buttonStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

/* LOGOUT BUTTON */

const logoutButton = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

export default Dashboard;