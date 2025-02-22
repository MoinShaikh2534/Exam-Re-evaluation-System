import React from "react";

const FacultyNavbar = ({ faculty }) => {
  if (!faculty) {
    console.error("FacultyNavbar received undefined faculty prop");
    return <p className="text-center text-red-500">Error: Faculty data not found</p>;
  }

  return (
    <>
      <nav className="bg-white p-2 shadow-lg">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <div className="text-blue-700 text-xl font-bold">
            Exam Re-evaluation System
          </div>
          <div className="flex-1 flex justify-end">
            <a href="/" className="text-red-600 hover:bg-red-200 py-2 px-4 rounded-lg transition duration-300">
              Logout
            </a>
          </div>
        </div>
      </nav>

      {/* Faculty Profile */}
      <div className="relative bg-gradient-to-r from-blue-300 to-blue-500 p-5 rounded-xl shadow-lg flex items-center gap-4 border border-white/40 w-150 mx-auto mt-4 backdrop-blur-lg">
        
        {/* Profile Image */}
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
          {faculty.profilePic ? (
            <img src={faculty.profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl text-gray-200">👤</span>
          )}
        </div>

        {/* Faculty Info */}
        <div className="text-white space-y-1">
          <h2 className="text-xl font-semibold">{faculty.name || "N/A"}</h2>
          <p className="text-sm opacity-90">
            <span className="font-semibold">Branch:</span> {faculty.branch || "N/A"}
          </p>
        </div>
      </div>
    </>
  );
};

export default FacultyNavbar;
