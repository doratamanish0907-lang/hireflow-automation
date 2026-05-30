const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractSkillsFromResume = async (filePath) => {

  const dataBuffer = fs.readFileSync(filePath);

  const data = await pdfParse(dataBuffer);

  const text = data.text.toLowerCase();

  const skillsList = [
    "javascript",
    "react",
    "node.js",
    "mongodb",
    "python",
    "java",
    "html",
    "css",
    "express",
    "sql",
    "aws",
    "docker",
    "kubernetes",
    "ai",
    "machine learning",
  ];

  const foundSkills = [];

  skillsList.forEach((skill) => {

    if (text.includes(skill)) {
      foundSkills.push(skill);
    }

  });

  return foundSkills;
};

module.exports = extractSkillsFromResume;