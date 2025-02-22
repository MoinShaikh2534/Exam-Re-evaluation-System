import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StudentDashboard from "./pages/StudentDashboard";
import Result from "./pages/Result";
import ReEvaluation from "./pages/ReEvaluation";
import StudentLogin from "./pages/StudentLogin";
import Logout from "./pages/Logout";
import FacultyLogin from "./pages/FacultyLogin";
import Home from "./pages/Home";
import LoginRestrictedRoute from "./components/LoginRestrictedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Without Layout) */}
        <Route path="/" element={<StudentLogin />} />
        <Route path="/faculty/login" element={<FacultyLogin />} />

        {/* Protected Routes (With Layout) */}
        <Route
          element={<Layout />} // Apply Layout to all except login
        >
          <Route
            path="/home"
            element={
              <LoginRestrictedRoute>
                <Home />
              </LoginRestrictedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <LoginRestrictedRoute>
                <Result />
              </LoginRestrictedRoute>
            }
          />
          <Route
            path="/re-evaluation"
            element={
              <LoginRestrictedRoute>
                <ReEvaluation />
              </LoginRestrictedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <LoginRestrictedRoute>
                <Logout />
              </LoginRestrictedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
