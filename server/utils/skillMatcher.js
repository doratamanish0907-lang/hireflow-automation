const skillsList = [
  "javascript",
  "typescript",
  "react",
  "react native",
  "node",
  "express",
  "mongodb",
  "mongoose",
  "html",
  "css",
  "tailwind",
  "bootstrap",
  "java",
  "python",
  "c",
  "c++",
  "sql",
  "mysql",
  "firebase",
  "aws",
  "docker",
  "kubernetes",
  "git",
  "github",
  "rest api",
  "api",
  "machine learning",
  "deep learning",
  "artificial intelligence",
  "ai",
  "data structures",
  "algorithms",
  "next.js",
  "redux",
  "linux",
  "figma",
  "postman",
];

const extractSkills = (text) => {
  if (!text) {
    return [];
  }

  const lowerText = text.toLowerCase();

  const matchedSkills = [];

  skillsList.forEach((skill) => {
    if (lowerText.includes(skill.toLowerCase())) {
      matchedSkills.push(skill);
    }
  });

  return [...new Set(matchedSkills)];
};

module.exports = extractSkills;