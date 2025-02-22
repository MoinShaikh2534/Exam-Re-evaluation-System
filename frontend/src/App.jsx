import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Result from "./pages/Result";
import ReEvaluation from "./pages/ReEvaluation";
import StudentLogin from "./pages/StudentLogin";
import Logout from "./pages/Logout";
import FacultyLogin from "./pages/FacultyLogin";

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
      </Routes>
    </Router>
  );
};

export default App;
