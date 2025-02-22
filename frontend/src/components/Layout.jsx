import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Profile from "./Profile";

const Layout = ({ children }) => {
  const location = useLocation(); // Get the current route path

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}


      {/* Profile Section (Exclude on /login page) */}
      {location.pathname !== "/login" && (
        <div className="min-h-20 flex flex-col bg-gray-100 mt-10 mx-10">
          <Navbar />
          <Profile />
        </div>
      )}

      {/* Main Content (Page Content) */}
      <main className="flex-grow p-8 max-w-6xl mx-auto mt-10">{children}</main>
    </div>
  );
};

export default Layout;
