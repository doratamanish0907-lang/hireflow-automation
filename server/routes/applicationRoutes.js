const express = require("express");

const router = express.Router();

const Application = require("../models/Application");


// SAVE APPLICATION

router.post("/add", async (req, res) => {

  try {

    const application = new Application(req.body);

    await application.save();

    res.json({
      success: true,
      message: "Application Saved",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});


// GET APPLICATION HISTORY

router.get("/history", async (req, res) => {

  try {

    const applications = await Application.find().sort({
      appliedDate: -1,
    });

    res.json(applications);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;