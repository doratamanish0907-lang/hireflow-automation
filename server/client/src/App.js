import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import UploadResume from "./pages/UploadResume";
import Profile from "./pages/Profile";
import ApplicationHistory from "./pages/ApplicationHistory";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/upload-resume" element={<UploadResume />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/application-history"
          element={<ApplicationHistory />}
        />

      </Routes>
    </Router>
  );
}

export default App;
