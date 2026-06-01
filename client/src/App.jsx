import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs/search")
      .then((res) => res.json())
      .then((data) => {
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
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1>HireFlow Automation 🚀</h1>

      <p>AI Powered Job Automation Platform</p>

      {loading ? (
        <h2>Loading Jobs...</h2>
      ) : (
        <div>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                style={{
                  background: "white",
                  padding: "20px",
                  marginTop: "20px",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
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
      )}
    </div>
  );
}

export default App;
