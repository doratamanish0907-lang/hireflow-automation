const axios = require("axios");

// STATIC JOBS
const jobs = [
  {
    company: "Amazon",
    role: "SDE Intern",
    skills: ["javascript", "react", "node", "mongodb"],
  },
  {
    company: "Google",
    role: "ML Engineer",
    skills: ["python", "tensorflow", "machine learning", "deep learning"],
  },
  {
    company: "Atlassian",
    role: "Backend Developer",
    skills: ["node", "express", "mongodb", "api"],
  },
  {
    company: "Microsoft",
    role: "AI Engineer",
    skills: ["python", "pytorch", "computer vision"],
  },
];

// GET MATCHED JOBS
exports.getMatchedJobs = async (req, res) => {
  try {
    const resumeText = req.body.resumeText.toLowerCase();

    const matchedJobs = jobs.map((job) => {
      let matchedSkills = 0;

      job.skills.forEach((skill) => {
        if (resumeText.includes(skill.toLowerCase())) {
          matchedSkills++;
        }
      });

      const matchPercentage = Math.round(
        (matchedSkills / job.skills.length) * 100
      );

      return {
        company: job.company,
        role: job.role,
        matchPercentage,
      };
    });

    const filteredJobs = matchedJobs.filter(
      (job) => job.matchPercentage > 0
    );

    res.json({
      success: true,
      jobs: filteredJobs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Job matching failed",
    });
  }
};

// AUTO APPLY FUNCTION
exports.autoApply = async (req, res) => {
  console.log("🔥 Auto Apply API Hit");

  try {
    const { company, role } = req.body;

    console.log("Company:", company);
    console.log("Role:", role);

    // TEMP SUCCESS RESPONSE
    // Baad me yahan Puppeteer/Naukri automation add karenge

    return res.status(200).json({
      success: true,
      message: `Successfully Applied for ${role} at ${company}`,
    });
  } catch (error) {
    console.log("AUTO APPLY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Auto Apply Failed",
    });
  }
};