const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  status: {
    type: String,
    default: "Applied",
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Application",
  applicationSchema
);