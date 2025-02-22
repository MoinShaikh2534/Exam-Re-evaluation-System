import React, { useState } from "react";
import Avatar from "../assets/avatar.jpg";
import { Toaster, toast } from 'react-hot-toast';

const initialSubmissions = [
  { id: 1, student: "Alice", subject: "Data Structures", date: "Feb 15, 2025", status: "Pending" },
  { id: 2, student: "Bob", subject: "Algorithm Analysis", date: "Feb 16, 2025", status: "Pending" },
  { id: 3, student: "Charlie", subject: "Java", date: "Feb 17, 2025", status: "Reviewed" },
];

const faculty = {
  profilePic: Avatar,
  name: "John Doe",
  branch: "Computer Science",
};

function EvaluatorDashboard() {
  const [submissions, setSubmissions] = useState(initialSubmissions);

  // Function to mark submission as checked
  const markAsChecked = (id) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission.id === id ? { ...submission, status: "Checked" } : submission
      )
    );
    toast.success('Submission marked as checked!');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster />
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800"> Exams ({submissions.length})</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-500 text-white text-sm uppercase tracking-wide">
                  <th className="py-3 px-4 text-left">Student</th>
                  <th className="py-3 px-4 text-left">Subject</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr
                    key={submission.id}
                    className={`border-b hover:bg-gray-50 transition-all duration-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-800">{submission.student}</td>
                    <td className="py-3 px-4 text-gray-700">{submission.subject}</td>
                    <td className="py-3 px-4 text-gray-600">{submission.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          submission.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : submission.status === "Checked"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {submission.status === "Pending" ? "Ongoing" : submission.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {submission.status === "Checked" ? (
                        <span className="text-green-500 font-medium">✔ Checked</span>
                      ) : (
                        <button
                          onClick={() => markAsChecked(submission.id)}
                          className="text-blue-500 hover:text-blue-700 cursor-pointer font-medium"
                        >
                          Check
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluatorDashboard;