const UserProfile = require("../models/UserProfile");

const saveProfile = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      skills,
      experience,
      preferredRole,
      resumePath,
    } = req.body;

    const profile = new UserProfile({

      name,
      email,
      phone,
      skills,
      experience,
      preferredRole,
      resumePath,

    });

    await profile.save();

    res.json({
      success: true,
      message: "Profile Saved",
      profile,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  saveProfile,
};