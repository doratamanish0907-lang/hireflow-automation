const express = require("express");

const router = express.Router();

const Profile = require("../models/Profile");


// SAVE PROFILE

router.post(
  "/save",

  async (req, res) => {

    try {

      const profile =
        new Profile({

          name: req.body.name,

          email: req.body.email,

          phone: req.body.phone,

         skills: req.body.skills,

          experience:
            req.body.experience,

          preferredRole:
            req.body.preferredRole,

        });

      await profile.save();

      res.json({
        success: true,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });

    }

  }
);


// GET LATEST PROFILE

router.get(
  "/latest",

  async (req, res) => {

    try {

      const profile =
        await Profile.findOne()
        .sort({ _id: -1 });

      res.json(profile);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });

    }

  }
);

module.exports = router;