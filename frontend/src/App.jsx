import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StudentDashboard from "./pages/StudentDashboard";
import Result from "./pages/Result";
import ReEvaluation from "./pages/ReEvaluation";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Login Routes */}
        <Route path="/faculty/login" element={<Login />} />
        <Route path="/student/login" element={<StudentLogin />} />

        {/* Protected Routes inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/re-evaluation" element={<ReEvaluation />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
