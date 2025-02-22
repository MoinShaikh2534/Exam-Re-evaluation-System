import React, { useState } from "react";

const results = [
  { subject: "Mathematics", date: "Dec 15, 2023", score: "85/100", status: "pending" },
  { subject: "Operating Systems", date: "Dec 18, 2023", score: "92/100", status: "reviewed" },
  { subject: "Database Engineering", date: "Dec 24, 2023", score: "90/100", status: "reviewed" },
  { subject: "Unix Internals", date: "Dec 18, 2023", score: "92/100", status: "reviewed" },
  { subject: "Computer Algorithms", date: "Dec 18, 2023", score: "92/100", status: "pending" },];

const Modal = ({ show, onClose, result }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{result.subject}</h2>
        <p className="text-gray-700 mb-2">Date: {result.date}</p>
        <p className="text-gray-700 mb-2">Score: {result.score}</p>
        <p className={`text-sm font-semibold mt-1 ${result.status === "pending" ? "text-yellow-500" : "text-green-600"}`}>
          Status: {result.status}
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

function StudentDashboard() {
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewClick = (result) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResult(null);
  };

  return (
    <div className="bg-gray-100 px-10 py-8">
      {/* Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-0">
        {results.map((result, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-md border border-blue-300 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <h3 className="text-2xl font-bold text-gray-800">{result.subject}</h3>
            <p className="text-gray-500 text-sm">{result.date}</p>

            {/* Thin Line Separator */}
            <hr className="border-t border-gray-300 my-2" />

            <p className={`text-sm font-semibold mt-1 ${result.status === "pending" ? "text-yellow-500" : "text-green-600"}`}>
              {result.status}
            </p>
            <p>Click here to review your answersheet</p>
            <button
              onClick={() => handleViewClick(result)}
              className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Modal for preview */}
      {selectedResult && (
        <Modal show={showModal} onClose={handleCloseModal} result={selectedResult} />
      )}
    </div>
  );
}

export default StudentDashboard;