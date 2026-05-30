import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


// PAGES

import Login from "./pages/Login";

import Register from "./pages/Register";

import UploadResume from "./pages/UploadResume";

import Profile from "./pages/Profile";

import ApplicationHistory from "./pages/ApplicationHistory";

import Jobs from "./pages/Jobs";


// COMPONENTS

import Dashboard from "./component/Dashboard";

import MatchedJobs from "./component/MatchedJobs";


function App() {

  return (

    <Router>

      <Routes>

        {/* LOGIN PAGE */}

        <Route
          path="/"
          element={<Login />}
        />


        {/* REGISTER PAGE */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* UPLOAD RESUME */}

        <Route
          path="/upload"
          element={<UploadResume />}
        />


        {/* JOBS PAGE */}

        <Route
          path="/jobs"
          element={<Jobs />}
        />


        {/* APPLICATION HISTORY */}

        <Route
          path="/history"
          element={<ApplicationHistory />}
        />


        {/* MATCHED JOBS */}

        <Route
          path="/matched-jobs"
          element={<MatchedJobs />}
        />

<Route path="/profile" element={<Profile />} />


      </Routes>

      

    </Router>

  );
}

export default App;
