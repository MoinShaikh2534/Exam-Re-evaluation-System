import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import '../App.css';

const FacultyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, setLoggedInUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginURL = import.meta.env.VITE_API_URL + '/auth/faculty/login';
      const response = await axios.post(loginURL, {
        email,
        password
      }, {
        withCredentials: true
      });

      if (response.status !== 200)
        throw new Error("Login Failed");

      setLoggedInUser(response.data.data.faculty);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      navigate('/facultydashboard');
    } catch (error) {
      toast.error('Login failed. Please check your email and password.');
      console.log('error' + error);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: 'url(/DKTE-1.jpg)' }}
    >
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 bg-opacity-90 relative z-10">
        <h1 className="text-gray-800 text-2xl font-bold text-center mb-6">Faculty Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
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
            <a href="/" className="text-blue-600 hover:underline">
              Sign-in as Student
            </a>
          </div>
        </form>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
    </section>
  );
};

export default FacultyLogin;