const Resume = require("../models/Resume");
const {
  extractTextFromPDF,
  extractSkills,
} = require("../services/resumeParser");

const uploadResume = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Extract text from PDF
    const text = await extractTextFromPDF(req.file.path);

    // Extract skills
    const skills = extractSkills(text);

    // Save in database
    const resume = await Resume.create({
      userId,
      fileName: req.file.filename,
      filePath: req.file.path,
      skills,
      extractedText: text,
    });

    res.status(201).json({
      message: "Resume uploaded and parsed successfully",
      skills,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};