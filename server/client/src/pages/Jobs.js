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

  // ==========================
  // NAV BUTTON STYLE
  // ==========================

  const navButton = {

    backgroundColor: "#2563eb",

    color: "white",

    border: "none",

    padding: "12px 22px",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "bold",

    fontSize: "15px",

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
          "http://localhost:5000/api/bot/search-jobs"
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
          "http://localhost:5000/api/bot/real-auto-apply",
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

      if (
        response.data.success
      ) {

        alert(
          "✅ Auto Apply Success"
        );

      } else {

        alert(
          response.data.message ||
          "Apply Failed"
        );

      }

    } catch (error) {

      console.log(
        "AUTO APPLY ERROR:",
        error
      );

      console.log(
        error.response?.data
      );

      alert(

        error.response?.data
          ?.error ||

        error.response?.data
          ?.message ||

        "Auto Apply Failed"

      );

    } finally {

      // IMPORTANT FIX

      setApplyingId(null);

    }

  };

  // ==========================
  // LOGOUT
  // ==========================

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/");

  };

  // ==========================
  // UI
  // ==========================

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor:
          "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      {/* NAVIGATION */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "35px",
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
              "/upload-resume"
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
          onClick={logout}
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
          fontSize: "34px",
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

      {/* JOB LIST */}

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
                  "#1e293b",

                padding: "30px",

                marginTop: "25px",

                borderRadius:
                  "14px",

                border:
                  job.type ===
                  "Easy Apply"
                    ? "2px solid #22c55e"
                    : "2px solid #ef4444",

                boxShadow:
                  "0px 0px 15px rgba(0,0,0,0.5)",
              }}
            >

              {/* TITLE */}

              <h2
                style={{
                  fontSize:
                    "30px",

                  marginBottom:
                    "15px",
                }}
              >
                {job.title}
              </h2>

              {/* COMPANY */}

              <p
                style={{
                  color:
                    "#d1d5db",

                  fontSize:
                    "20px",

                  marginBottom:
                    "10px",
                }}
              >
                🏢 {
                  job.company
                }
              </p>

              {/* TYPE */}

              <p
                style={{
                  fontWeight:
                    "bold",

                  color:
                    job.type ===
                    "Easy Apply"
                      ? "#22c55e"
                      : "#f87171",

                  fontSize:
                    "18px",

                  marginBottom:
                    "20px",
                }}
              >
                {job.type}
              </p>

              {/* APPLY BUTTON */}

              <button

                style={{

                  padding:
                    "14px 28px",

                  backgroundColor:
                    applyingId ===
                    index
                      ? "#f97316"
                      : "#dc2626",

                  color:
                    "white",

                  border:
                    "none",

                  borderRadius:
                    "8px",

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