import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";

const TableRow = ({ request, index, handleStatusChange }) => (
    <tr key={index} className="text-center hover:bg-gray-200 transition-all">
        <td className="p-4 border">{request.studentId.name}</td>
        <td className="p-4 border">{request.studentId.department}</td>
        <td className="p-4 border">{request.studentId.year}</td>
        <td className="p-4 border">₹{request.paymentAmount}</td>
        <td className="p-4 border">{request.studentId.prn}</td>
        <td className="p-4 border">{request.requestedMarks.length || 0}</td>
        <td className="p-4 border">{request.transactionId}</td>
        <td
            className={`p-4 border font-semibold ${
                request.status === "approved"
                    ? "text-green-600"
                    : request.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-500"
            }`}
        >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </td>
        <td className="p-4 border flex justify-center gap-2">
            <button
                onClick={() => handleStatusChange(request._id, "approve")}
                className="px-2 py-1 bg-green-600 text-white rounded shadow hover:bg-green-800 transition-all"
            >
                Approve
            </button>
            <button
                onClick={() => handleStatusChange(request._id, "reject")}
                className="px-2 py-1 bg-red-600 text-white rounded shadow hover:bg-red-800 transition-all"
            >
                Reject
            </button>
        </td>
    </tr>
);

function Cashier() {
    const [data, setData] = useState([]);
    const [reloadCount, setReloadCount] = useState(0);
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const requestsUrl =
                    import.meta.env.VITE_API_URL + "/reeval/all";
                const response = await axios.get(requestsUrl, {
                    withCredentials: true,
                });
                setData(response.data.data);
            } catch (error) {
                console.log("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, [reloadCount]);

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            let url = "";
            if (newStatus === "approve")
                url = import.meta.env.VITE_API_URL + "/reeval/approve";
            else url = import.meta.env.VITE_API_URL + "/reeval/reject";
            const response = await axios.post(
                url,
                { requestId },
                { withCredentials: true },
            );
            console.log("Response:", response.data.data);
            // setData(response.data.data);
            if (newStatus === "approve")
                alert("Request approved successfully!");
            else alert("Request rejected successfully!");
            setReloadCount(reloadCount + 1);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-start justify-center pt-4">
            <div className="w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-300 mt-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    List of Requests (Revaluation)
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="p-4 border">Student Name</th>
                                <th className="p-4 border">Branch</th>
                                <th className="p-4 border">Year</th>
                                <th className="p-4 border">Fees</th>
                                <th className="p-4 border">Subject</th>
                                <th className="p-4 border">No. of Questions</th>
                                <th className="p-4 border">Transaction ID</th>
                                <th className="p-4 border">Status</th>
                                <th className="p-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((request, index) => (
                                <TableRow
                                    key={index}
                                    request={request}
                                    index={index}
                                    handleStatusChange={handleStatusChange}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Cashier;
