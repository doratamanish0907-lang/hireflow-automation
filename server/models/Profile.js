const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  name: String,

  email: String,

  phone: String,

  skills: [String],

  experience: String,

  preferredRole: String,

});

module.exports =
  mongoose.model(
    "Profile",
    profileSchema
  );