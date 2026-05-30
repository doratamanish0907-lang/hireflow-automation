import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Jobs() {

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [applyingId, setApplyingId] =
    useState(null);

  const navigate =
    useNavigate();

  const navButton = {

    backgroundColor: "#2563eb",

    color: "white",

    border: "none",

    padding: "10px 20px",

    borderRadius: "5px",

    cursor: "pointer",

    fontWeight: "bold",

  };

  // ==========================
  // FETCH JOBS
  // ==========================

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      setLoading(true);

      console.log(
        "Fetching Jobs..."
      );

      const response =
        await axios.get(
          "http://hireflow-automation.onrender.com/api/bot/search-jobs"
        );

      console.log(
        "Jobs Response:",
        response.data
      );

      setJobs(
        response.data
      );

      setLoading(false);

    } catch (error) {

      console.log(
        "FETCH ERROR:",
        error
      );

      setLoading(false);

      alert(
        "Failed To Fetch Jobs"
      );

    }

  };

  // ==========================
  // AUTO APPLY
  // ==========================

  const autoApply = async (
    job,
    index
  ) => {

    try {

      setApplyingId(index);

      console.log(
        "AUTO APPLY CLICKED"
      );

      console.log(
        "JOB:",
        job
      );

      const response =
        await axios.post(
          "http://hireflow-automation.onrender.com/api/bot/real-auto-apply",
          {
            jobTitle:
              job.title,

            company:
              job.company,
          }
        );

      console.log(
        "AUTO APPLY RESPONSE:",
        response.data
      );

      alert(
        response.data.message
      );

      setApplyingId(null);

    } catch (error) {

      console.log(
        "AUTO APPLY ERROR:",
        error
      );

      console.log(
        error.response?.data
      );

      setApplyingId(null);

      alert(

        error.response?.data
          ?.error ||

        error.response?.data
          ?.message ||

        "Auto Apply Failed"

      );

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor:
          "#111827",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      {/* NAVIGATION */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >

        <button
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
          style={navButton}
        >
          Dashboard
        </button>

        <button
          onClick={() =>
            navigate(
              "/profile"
            )
          }
          style={navButton}
        >
          Profile
        </button>

        <button
          onClick={() =>
            navigate(
              "/upload"
            )
          }
          style={navButton}
        >
          Upload Resume
        </button>

        <button
          onClick={() =>
            navigate(
              "/history"
            )
          }
          style={navButton}
        >
          History
        </button>

        <button
          onClick={() =>
            navigate(
              "/jobs"
            )
          }
          style={navButton}
        >
          Jobs
        </button>

        <button
          onClick={() =>
            navigate("/")
          }
          style={{
            ...navButton,
            backgroundColor:
              "#dc2626",
          }}
        >
          Logout
        </button>

      </div>

      {/* HEADING */}

      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        🚀 LIVE Naukri Jobs
      </h1>

      {/* LOADING */}

      {loading && (

        <h2>
          Loading Jobs...
        </h2>

      )}

      {/* NO JOBS */}

      {!loading &&
        jobs.length === 0 && (

          <h2>
            No Jobs Found
          </h2>

        )}

      {/* JOBS */}

      {!loading &&
        jobs.map(
          (
            job,
            index
          ) => (

            <div
              key={index}
              style={{
                backgroundColor:
                  "#1f2937",

                padding: "25px",

                marginTop: "20px",

                borderRadius:
                  "12px",

                border:
                  job.type ===
                  "Easy Apply"
                    ? "2px solid #22c55e"
                    : "2px solid #ef4444",

                boxShadow:
                  "0px 0px 10px rgba(0,0,0,0.4)",
              }}
            >

              {/* TITLE */}

              <h2
                style={{
                  fontSize:
                    "24px",
                }}
              >
                {job.title}
              </h2>

              {/* COMPANY */}

              <p
                style={{
                  marginTop:
                    "12px",

                  color:
                    "#d1d5db",

                  fontSize:
                    "18px",
                }}
              >
                🏢 {
                  job.company
                }
              </p>

              {/* TYPE */}

              <p
                style={{
                  marginTop:
                    "12px",

                  fontWeight:
                    "bold",

                  color:
                    job.type ===
                    "Easy Apply"
                      ? "#22c55e"
                      : "#f87171",

                  fontSize:
                    "18px",
                }}
              >
                {job.type}
              </p>

              {/* BUTTON */}

              <button

                style={{

                  marginTop:
                    "20px",

                  padding:
                    "12px 25px",

                  backgroundColor:
                    "#dc2626",

                  color:
                    "white",

                  border:
                    "none",

                  borderRadius:
                    "6px",

                  cursor:
                    "pointer",

                  fontWeight:
                    "bold",

                  fontSize:
                    "16px",

                }}

                disabled={
                  applyingId ===
                  index
                }

                onClick={() =>
                  autoApply(
                    job,
                    index
                  )
                }

              >

                {applyingId ===
                index
                  ? "Applying..."
                  : "Auto Apply"}

              </button>

            </div>

          )
        )}

    </div>

  );

}

export default Jobs;