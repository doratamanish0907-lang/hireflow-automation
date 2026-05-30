import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>
        Welcome to Hireflow Dashboard 🚀
      </h1>

      <p>
        Your Resume Auto-Apply System is working successfully.
      </p>

      <br />

      <button
        onClick={() => navigate("/upload")}
        style={{
          padding: "10px 20px",
          marginRight: "15px",
          cursor: "pointer",
        }}
      >
        Upload Resume
      </button>

      <button
        style={{
          padding: "10px 20px",
          marginRight: "15px",
          cursor: "pointer",
        }}
      >
        View Matched Jobs
      </button>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;