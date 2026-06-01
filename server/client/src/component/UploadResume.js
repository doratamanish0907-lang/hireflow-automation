import React, { useState } from "react";
import axios from "axios";

function UploadResume() {

  const [file, setFile] = useState(null);

  const [jobs, setJobs] = useState([]);

  const [skills, setSkills] = useState([]);

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
      }}
    >

      <h1>🚀 AI Resume Matcher</h1>

      <br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadResume}
        style={{
          marginLeft: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Upload Resume
      </button>

      {/* SKILLS */}

      <h2 style={{ marginTop: "40px" }}>
        Extracted Skills
      </h2>

      <div>

        {skills.map((skill, index) => (

          <span
            key={index}
            style={{
              backgroundColor: "green",
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

      {/* JOBS */}

      <h2 style={{ marginTop: "40px" }}>
        Matched Jobs
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
            Skills:
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
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
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