import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Modal from "../components/Facultymodel"; // Updated modal component

function EvaluatorDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/reeval/get-assigned-requests",
          { withCredentials: true }
        );

        if (response.data.status) {
          const sortedData = response.data.data
            .map((item) => ({
              id: item._id,
              student: item.studentId,
              subject: item.answerSheetId.subject.name,
              status: item.status === "rechecking" ? "Pending" : "Reviewed",
              pdfPath: item.answerSheetId.pdfPath,
              questionMarks: item.answerSheetId.questionMarks,
              year: item.studentId.year,
            }))
            .sort((a, b) => b.year - a.year); // Sorting by year (Descending)

          setSubmissions(sortedData);
        } else {
          toast.error("Failed to fetch data from the API.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  const handleViewClick = (data) => {
    setSelectedResult(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResult(null);
  };

  // Function to filter submissions by year
  const filterByYear = (year) => submissions.filter((s) => s.year === year);

  return (
    <div className="bg-gray-100 px-10 py-8 min-h-screen">
      <Toaster />
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Evaluator Dashboard
      </h2>

      {/* Conditional Sections for Years */}
      {[3, 2, 1].map((year) => {
        const filteredSubmissions = filterByYear(year);
        if (filteredSubmissions.length === 0) return null;

        return (
          <div key={year} className="mb-10">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              {year === 3 ? "Third Year" : year === 2 ? "Second Year" : "First Year"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredSubmissions.map((submission, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-2xl shadow-md border border-blue-300 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <h3 className="text-2xl font-bold text-gray-800">
                    {submission.subject}
                  </h3>
                  <p className="text-gray-500 text-sm">Year: {submission.year}</p>

                  <hr className="border-t border-gray-300 my-2" />

                  <p
                    className={`text-sm font-semibold mt-1 ${
                      submission.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {submission.status}
                  </p>
                  <p>Click here to review the answer sheet</p>
                  <button
                    onClick={() => handleViewClick(submission)}
                    className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Modal for PDF preview */}
      {selectedResult && (
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          data={selectedResult}
          fileName={selectedResult.pdfPath.split("\\").pop()}
        />
      )}
    </div>
  );
}

export default EvaluatorDashboard;
