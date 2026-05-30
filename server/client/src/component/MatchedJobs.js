import React, { useEffect, useState } from "react";
import axios from "axios";

function MatchedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const skills = [
        "javascript",
        "react",
        "python",
        "ai",
      ];

      const response = await axios.get(
        `http://hireflow-automation.onrender.com/api/jobs/matched-jobs?skills=${skills.join(",")}`
      );

      setJobs(response.data);

    } catch (error) {
      console.log(error);
      alert("Failed to fetch jobs");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        🚀 Matched Jobs
      </h1>

      {jobs.length === 0 ? (
        <p>No matched jobs found</p>
      ) : (
        jobs.map((job, index) => (
          <div
            key={index}
            style={{
              background: "#1e293b",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>{job.title}</h2>

            <p>
              <strong>Company:</strong> {job.company}
            </p>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Skills:</strong>{" "}
              {job.skillsRequired.join(", ")}
            </p>

            <a
              href={job.applyLink}
              target="_blank"
              rel="noreferrer"
            >
              <button
                style={{
                  padding: "10px 20px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Apply Now
              </button>
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default MatchedJobs;