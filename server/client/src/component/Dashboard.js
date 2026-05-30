import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "40px",
        }}
      >
        🚀 Welcome to HireFlow Dashboard
      </h1>

      {/* Upload Resume Button */}
      <button
        onClick={() => navigate("/upload")}
        style={{
          padding: "15px 30px",
          marginBottom: "20px",
          background: "#2563eb",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Upload Resume
      </button>

      {/* Matched Jobs Button */}
      <button
        onClick={() => navigate("/matched-jobs")}
        style={{
          padding: "15px 30px",
          background: "limegreen",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        View Matched Jobs
      </button>
    </div>
  );
}

export default Dashboard;