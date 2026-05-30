const express = require("express");

const router = express.Router();

const sendEmail = require("../services/emailService");

// AUTO APPLY ROUTE

router.post("/apply", async (req, res) => {

  try {

    const { email, jobTitle, company } = req.body;

    await sendEmail(

      email,

      "Job Application Submitted",

      `You successfully applied for ${jobTitle} at ${company}`

    );

    res.json({
      success: true,
      message: "Application Submitted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

});

module.exports = router;