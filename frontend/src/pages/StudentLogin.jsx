import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import '../App.css';

const StudentLogin = () => {
  const [prn, setPrn] = useState("");
  const [dob, setDob] = useState("");
  const { setIsAuthenticated, setLoggedInUser, isAuthenticated, loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (loggedInUser.role === "student")
        navigate('/home');
      else
        navigate('/')
    } else {
      navigate("/")
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginURL = import.meta.env.VITE_API_URL + '/auth/student/login';
      const response = await axios.post(loginURL, {
        prn,
        dob
      }, {
        withCredentials: true
      });

      if (response.status !== 200)
        throw new Error("Login Failed");

      setLoggedInUser(response.data.data.student);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      navigate('/home');
    } catch (error) {
      toast.error('Login failed. Please check your PRN and Date of Birth.');
      console.log('error' + error);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: 'url(/dkte.jpeg)' }}
    >
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 bg-opacity-90 relative z-10">
        <h1 className="text-gray-800 text-2xl font-bold text-center mb-6">Student Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="prn" className="block text-sm font-medium text-gray-700">PRN</label>
            <input
              type="text"
              id="prn"
              value={prn}
              onChange={(e) => setPrn(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter your PRN"
              required
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign in
          </button>
          <div className="flex items-center justify-center mt-4">
            <a href="/faculty/login" className="text-blue-600 hover:underline">
              Sign-in as Faculty
            </a>
          </div>
        </form>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
    </section>
  );
};

export default StudentLogin;