const express = require("express");

const router = express.Router();

const Job = require("../models/Job");

// GET ALL JOBS
router.get("/search", async (req, res) => {

  try {

    const jobs = await Job.find();

    res.json(jobs);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

module.exports = router;