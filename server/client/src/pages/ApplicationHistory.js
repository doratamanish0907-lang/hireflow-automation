import React, { useEffect, useState } from "react";

import axios from "axios";

function ApplicationHistory() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/application/history"
      );

      setApplications(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111827",
        color: "white",
        padding: "40px",
      }}
    >

      <h1>📜 Application History</h1>

      {applications.map((app) => (

        <div
          key={app._id}
          style={{
            backgroundColor: "#1f2937",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >

          <h2>{app.title}</h2>

          <p>🏢 {app.company}</p>

          <p>📍 {app.location}</p>

          <p>📌 Status: {app.status}</p>

          <p>
            📅 Applied:
            {" "}
            {new Date(app.appliedDate).toLocaleDateString()}
          </p>

        </div>

      ))}

    </div>
  );
}

export default ApplicationHistory;