import React, { useEffect } from "react";
import avatar from '../assets/avatar.jpg';
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { loggedInUser } = useAuth();

  useEffect(() => {
    console.log('loggedInUser: ', loggedInUser);
  }, [loggedInUser]);

  if (!loggedInUser) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="flex items-center w-full bg-[#201547] text-white rounded-lg p-2 shadow-lg">
      {/* Left Section - Profile Image & Name */}
      <div className="w-1/4 flex items-center justify-center bg-gradient-to-b from-yellow-500 to-yellow-700 p-3 rounded-l-xl mx-2">
        <img
          className="w-24 h-24 rounded-full border-4 border-white"
          src={avatar}
          alt="Profile"
        />
        <h2 className="text-lg font-semibold ml-4">{loggedInUser.name}</h2>
      </div>

      {/* Right Section - Profile Details */}
      <div className="flex-1 p-6 flex justify-end">
        <div>
          <p className="text-gray-100 text-lg">{loggedInUser.prn}</p>
          <p className="text-gray-100 text-lg">{loggedInUser.department}</p>
          <div className="flex space-x-4">
            <p className="text-gray-300 text-lg">Year: <span className="text-gray-100 text-l">{loggedInUser.year}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
