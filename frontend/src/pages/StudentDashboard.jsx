import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Modal from "../components/Modal"; // Import the updated modal

function StudentDashboard() {
    const [selectedResult, setSelectedResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const { loggedInUser } = useAuth();
    const [reloadCount, setReloadCount] = useState(0);
    const handleViewClick = (data) => {
        setSelectedResult(data);
        console.log("data", data);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedResult(null);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const url = import.meta.env.VITE_API_URL + "/answersheet/all";
                const response = await axios.post(
                    url,
                    { studentId: loggedInUser._id },
                    { withCredentials: true },
                );

                console.log("Response:", response.data.data);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching answersheets:", error);
            }
        }

        if (loggedInUser?._id) {
            fetchData();
        }
    }, [loggedInUser, reloadCount]);

    return (
        <div className="bg-gray-100 px-10 py-8">
            {/* Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {data.map((data, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white rounded-2xl shadow-md border border-blue-300 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                        <h3 className="text-2xl font-bold text-gray-800">
                            {data.subject?.name} ({data.subject?.code})
                        </h3>
                        <p className="text-gray-500 text-sm">{data.date}</p>

                        <hr className="border-t border-gray-300 my-2" />

                        <p
                            className={`text-sm font-semibold mt-1 ${
                                data.status === "pending"
                                    ? "text-yellow-500"
                                    : data.status === "approved"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {data.status}
                        </p>
                        <p>Click here to review your answersheet</p>
                        <button
                            onClick={() => handleViewClick(data)}
                            className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300"
                        >
                            View
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal for PDF preview */}
            {selectedResult && (
                <Modal
                    show={showModal}
                    onClose={handleCloseModal}
                    data={selectedResult}
                    setReloadCount={setReloadCount}
                    reloadCount={reloadCount}
                    fileName="1740270127399-52927750.pdf"
                    qrCodeImageUrl="QR.jpg" // Provide the QR code image URL here
                />
            )}
        </div>
    );
}

export default StudentDashboard;
