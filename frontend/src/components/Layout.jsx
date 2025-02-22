import React from 'react';
import Navbar from './Navbar';
import Profile from './Profile';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {/* Profile Section */}
      <div className="min-h-20 flex flex-col bg-gray-100 mt-10 mx-10">
        <Profile />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;