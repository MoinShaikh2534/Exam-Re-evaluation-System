import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import pdfFile from '../../../backend/uploads/Maths_rotated.pdf';

const Facultymodel = ({ show, onClose, data, updateSubmissionStatus }) => {
    const [marks, setMarks] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!show) {
            setMarks({});
        }
    }, [show]);

    if (!show) return null;

    const handleMarkChange = (questionNumber, mark) => {
        setMarks({ ...marks, [questionNumber]: mark });
    };

    const handleMarkSubmit = () => {
        console.log("Marks submitted:", marks);

        // Update submission status
        updateSubmissionStatus(data.id, "Checked");

        // Show success toast notification
        toast.success("Paper re-evaluated successfully!");

        // Close modal and delay navigation
        onClose();
        setTimeout(() => {
            navigate("/evaluatordashboard");
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-white p-6 rounded-lg shadow-lg w-screen h-screen flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Exam Details</h2>
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        Close
                    </button>
                </div>

                <div className="flex flex-grow overflow-hidden">
                    <div className="w-2/3 overflow-auto border rounded-lg">
                        <iframe src={pdfFile} width="100%" height="650px"></iframe>
                    </div>

                    <div className="w-1/3 bg-gray-50 p-4 overflow-y-auto border-l">
                        <h3 className="text-lg font-bold mb-2">Marks Table</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-2 py-1">Q. No</th>
                                    <th className="border px-2 py-1">Obtained</th>
                                    <th className="border px-2 py-1">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(10).keys()].map((i) => (
                                    <tr key={i} className="text-center">
                                        <td className="border px-2 py-1">{i + 1}</td>
                                        <td className="border px-2 py-1">
                                            <input type="number" min="0" max="5" onChange={(e) => handleMarkChange(i + 1, e.target.value)} />
                                        </td>
                                        <td className="border px-2 py-1">5</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handleMarkSubmit} className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                            Submit Marks
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Facultymodel;
