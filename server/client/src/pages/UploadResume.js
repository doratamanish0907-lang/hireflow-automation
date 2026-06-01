import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadResume() {

  const [file, setFile] = useState(null);

  const [jobs, setJobs] = useState([]);

  const [skills, setSkills] = useState([]);

  const [score, setScore] = useState(0);

  const [missingSkills, setMissingSkills] = useState([]);

  const [recommendation, setRecommendation] = useState("");

  const navigate = useNavigate();

  // NAV BUTTON STYLE
  const navButton = {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  // UPLOAD FUNCTION
  const uploadResume = async () => {

    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {

      const response = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData
      );

      console.log(response.data);

      setSkills(response.data.extractedSkills);

      setJobs(response.data.matchedJobs);

      setScore(response.data.score);

      setMissingSkills(response.data.missingSkills);

      setRecommendation(response.data.recommendation);

      alert("Resume Uploaded Successfully");

    } catch (error) {

      console.log(error);

      alert("Upload failed");
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

      {/* NAVIGATION BUTTONS */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >

        <button
          onClick={() => navigate("/dashboard")}
          style={navButton}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/upload")}
          style={navButton}
        >
          Upload Resume
        </button>

        <button
          onClick={() => navigate("/jobs")}
          style={navButton}
        >
          Jobs
        </button>

        <button
          onClick={() => navigate("/")}
          style={navButton}
        >
          Logout
        </button>

      </div>

      <h1>🚀 AI Resume Analyzer</h1>

      <br />

      {/* FILE INPUT */}

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadResume}
        style={{
          marginLeft: "20px",
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload Resume
      </button>

      {/* SCORE */}

      <div
        style={{
          marginTop: "40px",
          backgroundColor: "#1f2937",
          padding: "20px",
          borderRadius: "10px",
        }}
      >

        <h2>📊 Resume Score</h2>

        <h1 style={{ color: "#22c55e" }}>
          {score}%
        </h1>

        <div
          style={{
            backgroundColor: "#374151",
            height: "20px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >

          <div
            style={{
              width: `${score}%`,
              backgroundColor: "#22c55e",
              height: "100%",
            }}
          ></div>

        </div>

      </div>

      {/* EXTRACTED SKILLS */}

      <h2 style={{ marginTop: "40px" }}>
        ✅ Extracted Skills
      </h2>

      <div>

        {skills.map((skill, index) => (

          <span
            key={index}
            style={{
              backgroundColor: "#16a34a",
              padding: "8px 15px",
              margin: "10px",
              borderRadius: "20px",
              display: "inline-block",
            }}
          >
            {skill}
          </span>

        ))}

      </div>

      {/* MISSING SKILLS */}

      <h2 style={{ marginTop: "40px" }}>
        ❌ Missing Skills
      </h2>

      <div>

        {missingSkills.map((skill, index) => (

          <span
            key={index}
            style={{
              backgroundColor: "#dc2626",
              padding: "8px 15px",
              margin: "10px",
              borderRadius: "20px",
              display: "inline-block",
            }}
          >
            {skill}
          </span>

        ))}

      </div>

      {/* AI RECOMMENDATION */}

      <div
        style={{
          marginTop: "40px",
          backgroundColor: "#1f2937",
          padding: "20px",
          borderRadius: "10px",
        }}
      >

        <h2>🤖 AI Recommendation</h2>

        <p>{recommendation}</p>

      </div>

      {/* MATCHED JOBS */}

      <h2 style={{ marginTop: "40px" }}>
        💼 Matched Jobs
      </h2>

      {jobs.map((job) => (

        <div
          key={job._id}
          style={{
            backgroundColor: "#1f2937",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >

          <h3>{job.title}</h3>

          <p>🏢 {job.company}</p>

          <p>📍 {job.location}</p>

          <p>
            Skills: {job.skillsRequired.join(", ")}
          </p>

          <a
            href={job.applyLink}
            target="_blank"
            rel="noreferrer"
          >

            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#16a34a",
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

      ))}

    </div>
  );
}

export default UploadResume;