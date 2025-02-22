import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const FacultyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, setLoggedInUser } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const loginURL = import.meta.env.VITE_API_URL + '/auth/faculty/login';
      const response = await axios.post(loginURL, {
        email,
        password
      },
        {
          withCredentials: true
        })

      console.log('response', response);
      if (response.status !== 200)
        throw new Error("Login Failed")
      console.log(response.data.data.faculty);
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

        <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
          Faculty Login</h2>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
          <div className="flex tw font-bold hover:underline items-center tw text-white   justify-center ">
            <a href="/" className="tw">
              Sign-in as Student
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FacultyLogin;
