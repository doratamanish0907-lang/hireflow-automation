const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();


const authRoutes = require("./routes/authRoutes");

const resumeRoutes = require("./routes/resumeRoutes");

const jobRoutes = require("./routes/jobRoutes");

const autoApplyRoutes = require("./routes/autoApplyRoutes");

const app = express();

const botRoutes =require("./routes/botRoutes");

const profileRoutes = require("./routes/profileRoutes");

const applicationRoutes = require("./routes/applicationRoutes");

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/auto-apply", autoApplyRoutes);

app.use("/api/application", applicationRoutes);

app.use("/api/bot", botRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.listen(5000, () => {
   console.log("Server running on port 5000");
});