const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);

  const data = await pdfParse(dataBuffer);

  return data.text;
};

const extractSkills = (text) => {
  const skillsList = [
    "javascript",
    "react",
    "node",
    "mongodb",
    "express",
    "html",
    "css",
    "python",
    "java",
    "sql",
    "aws",
    "docker",
    "git"
  ];

  const lowerText = text.toLowerCase();

  const foundSkills = skillsList.filter((skill) =>
    lowerText.includes(skill)
  );

  return foundSkills;
};

module.exports = {
  extractTextFromPDF,
  extractSkills,
};