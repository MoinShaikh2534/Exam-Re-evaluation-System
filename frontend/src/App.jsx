import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StudentLogin from "./pages/StudentLogin";
import FacultyLogin from "./pages/FacultyLogin";
import Home from "./pages/Home";
import Result from "./pages/Result";
import ReEvaluation from "./pages/ReEvaluation";
import Logout from "./pages/Logout";
import EvaluatorDashboard from "./pages/EvaluatorDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/faculty/login" element={<FacultyLogin />} />
        <Route path="/" element={<StudentLogin />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/re-evaluation" element={<ReEvaluation />} />
          <Route path="/logout" element={<Logout />} />

        </Route>
        <Route path="/facultydashboard" element={<EvaluatorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;