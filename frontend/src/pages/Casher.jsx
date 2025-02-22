import React, { useState, useCallback } from "react";

const requests = [
  { sName: "John Doe", branch: "CSE", year: "3rd", fees: "₹500", papers: 2, transID: "TXN12345", status: "Pending" },
  { sName: "Jane Smith", branch: "IT", year: "2nd", fees: "₹300", papers: 1, transID: "TXN67890", status: "Pending" },
  { sName: "Alice Brown", branch: "ECE", year: "4th", fees: "₹700", papers: 3, transID: "TXN11223", status: "Pending" },
];

const TableRow = ({ request, index, handleStatusChange }) => (
  <tr key={index} className="text-center hover:bg-gray-200 transition-all">
    <td className="p-4 border">{request.sName}</td>
    <td className="p-4 border">{request.branch}</td>
    <td className="p-4 border">{request.year}</td>
    <td className="p-4 border">{request.fees}</td>
    <td className="p-4 border">{request.papers}</td>
    <td className="p-4 border">{request.transID}</td>
    <td className={`p-4 border font-semibold ${request.status === "Approved" ? "text-green-600" : request.status === "Rejected" ? "text-red-600" : "text-yellow-500"}`}>
      {request.status}
    </td>
    <td className="p-4 border flex justify-center gap-2">
      <button
        onClick={() => handleStatusChange(index, "Approved")}
        className="px-2 py-1 bg-green-600 text-white rounded shadow hover:bg-green-800 transition-all"
      >
        Approve
      </button>
      <button
        onClick={() => handleStatusChange(index, "Rejected")}
        className="px-2 py-1 bg-red-600 text-white rounded shadow hover:bg-red-800 transition-all"
      >
        Reject
      </button>
    </td>
  </tr>
);

function RevaluationRequests() {
  const [data, setData] = useState(requests);

  const handleStatusChange = useCallback((index, newStatus) => {
    setData(prevData => {
      const updatedRequests = [...prevData];
      updatedRequests[index].status = newStatus;
      return updatedRequests;
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-12 flex items-center justify-center">
      <div className="max-w-7xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">List of Requests (Revaluation)</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-4 border">Student Name</th>
                <th className="p-4 border">Branch</th>
                <th className="p-4 border">Year</th>
                <th className="p-4 border">Fees</th>
                <th className="p-4 border">No. of Papers</th>
                <th className="p-4 border">Transaction ID</th>
                <th className="p-4 border">Status</th>
                <th className="p-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((request, index) => (
                <TableRow key={index} request={request} index={index} handleStatusChange={handleStatusChange} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RevaluationRequests;