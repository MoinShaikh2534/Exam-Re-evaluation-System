import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StudentDashboard from "./pages/StudentDashboard";
import Cashier from "./pages/Cashier";
import Result from "./pages/Result";
import ReEvaluation from "./pages/ReEvaluation";
import StudentLogin from "./pages/StudentLogin";
import FacultyLogin from "./pages/FacultyLogin";
import LoginRestrictedRoute from "./components/LoginRestrictedRoute";
import Logout from "./pages/Logout";
import { useAuth } from "./contexts/AuthContext";
import FacultyDashboard from "./dashboards/FacultyDashboard";

const App = () => {
  const { loggedInUser } = useAuth();
  console.log("loggedInUser", loggedInUser);

  return (
    <Router>
      <Routes>
        {/* Public Routes (Without Layout) */}
        <Route path="/" element={<StudentLogin />} />
        <Route path="/faculty/login" element={<FacultyLogin />} />

        {/* Protected Routes (With Layout) */}
        <Route element={<Layout />}>
          <Route
            path="/cashier"
            element={
              <LoginRestrictedRoute>
                <Cashier />
              </LoginRestrictedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <LoginRestrictedRoute>
                <StudentDashboard />
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
          <Route
            path="/facultydashboard"
            element={
              <LoginRestrictedRoute>
                <FacultyDashboard userRole={loggedInUser?.role} />
              </LoginRestrictedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
