const fs = require("fs");

const pdfParse = require("pdf-parse");

const mammoth = require("mammoth");

const extractSkills = (text) => {

  const skillsDatabase = [

    "javascript",
    "react",
    "node",
    "mongodb",
    "express",
    "python",
    "java",
    "c++",
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "ai",
    "gen ai",
    "llm",
    "langchain",
    "tensorflow",
    "pytorch",
    "nlp",
    "sql",
    "aws",
    "docker",
    "kubernetes",
    "html",
    "css",
    "nextjs",
    "typescript",
    "firebase",
    "opencv",
    "computer vision",
  ];

  const lowerText =
    text.toLowerCase();

  let matchedSkills = [];

  skillsDatabase.forEach(skill => {

    if (
      lowerText.includes(skill)
    ) {

      matchedSkills.push(skill);

    }

  });

  return matchedSkills;

};

const parseResume =
  async (resumePath) => {

    try {

      let text = "";

      // =====================
      // PDF
      // =====================

      if (
        resumePath.endsWith(".pdf")
      ) {

        const dataBuffer =
          fs.readFileSync(
            resumePath
          );

        const data =
          await pdfParse(
            dataBuffer
          );

        text = data.text;

      }

      // =====================
      // DOCX
      // =====================

      else if (
        resumePath.endsWith(".docx")
      ) {

        const result =
          await mammoth.extractRawText({

            path:
              resumePath,

          });

        text =
          result.value;

      }

      // =====================
      // SKILLS
      // =====================

      const skills =
        extractSkills(text);

      return {

        fullText: text,

        skills,

      };

    } catch (error) {

      console.log(
        "Resume Parse Error:",
        error
      );

      return {

        fullText: "",

        skills: [],

      };

    }

  };

module.exports =
  parseResume;