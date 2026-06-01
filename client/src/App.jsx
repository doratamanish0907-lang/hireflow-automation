import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hireflow-automation-production.up.railway.app/api/jobs/search")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>HireFlow Automation 🚀</h1>
      <p>AI Powered Job Automation Platform</p>

      {loading ? (
        <h2>Loading Jobs...</h2>
      ) : jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              margin: "20px auto",
              width: "60%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
              {job.skillsRequired?.join(", ")}
            </p>

            <a
              href={job.applyLink}
              target="_blank"
              rel="noreferrer"
            >
              Apply Now
            </a>
          </div>
        ))
      ) : (
        <h2>No Jobs Found</h2>
      )}
    </div>
  );
}

export default App;
