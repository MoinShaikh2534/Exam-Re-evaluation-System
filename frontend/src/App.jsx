import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StudentDashboard from "./pages/StudentDashboard";
import Result from "./pages/Result";
import ReEvaluation from "./pages/ReEvaluation";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<StudentDashboard/>} />
          <Route path="/result" element={<Result />} />
          <Route path="/re-evaluation" element={<ReEvaluation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;