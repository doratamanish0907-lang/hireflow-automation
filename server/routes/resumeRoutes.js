const express = require("express");

const router = express.Router();

const multer = require("multer");

const pdfParse = require("pdf-parse");

const fs = require("fs");

const Job = require("../models/Job");

const {
  generateTailoredResume,
} = require("../services/aiResumeBuilder");


// FILE UPLOAD CONFIG

const upload = multer({
  dest: "uploads/",
});


// =======================
// RESUME UPLOAD + ANALYZER
// =======================

router.post(
  "/upload",
  upload.single("resume"),

  async (req, res) => {

    try {

      const dataBuffer =
        fs.readFileSync(req.file.path);

      const pdfData =
        await pdfParse(dataBuffer);

      const text =
        pdfData.text.toLowerCase();

      // ================= SKILLS =================

      const skillsList = [

        "javascript",
        "react",
        "nodejs",
        "mongodb",
        "python",
        "java",
        "sql",
        "docker",
        "ai",
        "machine learning",
        "aws",

      ];

      const extractedSkills =
        skillsList.filter((skill) =>
          text.includes(skill)
        );

      console.log(
        "Extracted Skills:",
        extractedSkills
      );

      // ================= MATCH JOBS =================

      const matchedJobs =
        await Job.find({

          skillsRequired: {
            $in: extractedSkills,
          },

        });

      console.log(
        "Matched Jobs:",
        matchedJobs
      );

      // ================= RESUME SCORE =================

      const totalSkills =
        skillsList.length;

      const matchedSkillsCount =
        extractedSkills.length;

      const score = Math.min(

        Math.round(
          (
            matchedSkillsCount /
            totalSkills
          ) * 100
        ),

        100

      );

      // ================= MISSING SKILLS =================

      const missingSkills =
        skillsList.filter(
          (skill) =>
            !extractedSkills.includes(skill)
        );

      // ================= AI RECOMMENDATION =================

      let recommendation = "";

      if (score >= 80) {

        recommendation =
          "Excellent resume! You are highly skilled.";

      } else if (score >= 50) {

        recommendation =
          "Good resume. Add more modern tech skills.";

      } else {

        recommendation =
          "Improve your resume with more technical skills and projects.";
      }

      // ================= RESPONSE =================

      res.json({

        extractedSkills,

        matchedJobs,

        score,

        missingSkills,

        recommendation,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Upload failed",
      });

    }
  }
);


// =======================
// AI TAILORED RESUME GENERATOR
// =======================

router.post(
  "/generate-tailored",

  async (req, res) => {

    try {

      const {
        jobTitle,
        skills,
      } = req.body;

      const fileName =
        await generateTailoredResume(

          "",

          jobTitle,

          skills

        );

      res.json({

        success: true,

        message:
          "AI Tailored Resume Generated",

        fileName,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to generate tailored resume",

      });

    }

  }
);

module.exports = router;

