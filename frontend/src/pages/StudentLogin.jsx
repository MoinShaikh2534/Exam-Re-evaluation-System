import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import '../App.css'
const StudentLogin = () => {
  const [prn, setPrn] = useState("");
  const [dob, setDob] = useState("");
  const { setIsAuthenticated, setLoggedInUser } = useAuth()
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const loginURL = import.meta.env.VITE_API_URL + '/auth/student/login';
      const response = await axios.post(loginURL, {
        prn,
        dob
      },
        {
          withCredentials: true
        })

      console.log('response', response);
      if (response.status !== 200)
        throw new Error("Login Failed")
      console.log(response.data.data.student);
      navigate('/home')

      setLoggedInUser(response.data.data.student);
      setIsAuthenticated(true);


    } catch (error) {
      console.log('error' + error);

    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <div className="flex flex-col items-center mb-6">

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Student Login
          </h1>
        </div>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          {/* PRN Field */}
          <div>
            <label
              htmlFor="prn"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              PRN (Permanent Registration Number)
            </label>
            <input
              type="text"
              id="prn"
              value={prn}
              onChange={(e) => setPrn(e.target.value)}
              className="mt-1 block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your PRN"
              required
            />
          </div>

          {/* Date of Birth Field */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1 block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
          <div className="flex tw font-bold hover:underline items-center tw text-white   justify-center ">
            <a href="/faculty/login" className="tw">
              Sign-in as Faculty
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentLogin;
