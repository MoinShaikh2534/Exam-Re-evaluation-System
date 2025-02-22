import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Profile from "./Profile";

const Layout = () => {
  return (
      <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Profile Section */}
      <div className="min-h-20 flex flex-col bg-gray-100 mt-10 mx-10">
        <Profile />
      </div>
      <main className="flex-grow p-8 max-w-6xl mx-auto mt-10">
        <Outlet /> {/* This ensures children components render here */}
      </main>
    </div>
  );
};

export default Layout;
