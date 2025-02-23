import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pdfFile from '../../../backend/uploads/Maths_rotated.pdf';

const Facultymodel = ({ show, onClose, data, fileUniqueName, updateSubmissionStatus }) => {
    const [marks, setMarks] = useState({});
    const [remarks, setRemarks] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.remarks) {
            setRemarks(data.remarks);
        } else {
            // Add sample student remark
            setRemarks({
                3: {
                    expected: 4,
                    remark: "I would like to request a re-evaluation for question 3. I believe I should have received 4 marks instead of 2."
                }
            });
        }
    }, [data]);

    if (!show) return null;

    // Function to handle mark change
    const handleMarkChange = (questionNumber, mark) => {
        setMarks({ ...marks, [questionNumber]: mark });
    };

    // Function to handle mark submission
    const handleMarkSubmit = () => {
        console.log('Marks submitted:', marks);
        console.log('Remarks submitted:', remarks);
        updateSubmissionStatus(data.id, "Checked");
        onClose();
        navigate('/evaluatordashboard');
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-screen h-screen flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Exam Details</h2>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>

                <div className="flex flex-grow overflow-hidden">
                    {/* Left Side: PDF Viewer */}
                    <div className="w-2/3 overflow-auto border rounded-lg">
                        <div className="overflow-auto border rounded-lg">
                            <iframe
                                src={pdfFile}
                                width="100%"
                                height="650px"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Side: Marks Table */}
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
                                            <select
                                                value={marks[i + 1] || ""}
                                                onChange={(e) => handleMarkChange(i + 1, e.target.value)}
                                                className="p-2 border rounded"
                                            >
                                                <option value="">Select</option>
                                                {[...Array(6).keys()].map((mark) => (
                                                    <option key={mark} value={mark}>{mark}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="border px-2 py-1">5</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={handleMarkSubmit}
                            className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Submit Marks
                        </button>
                        <div className="mt-4">
                            <h3 className="text-lg font-bold mb-2">Student Remarks</h3>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border px-2 py-1">Q. No</th>
                                        <th className="border px-2 py-1">Expected</th>
                                        <th className="border px-2 py-1">Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(remarks).map((key) => (
                                        <tr key={key} className="text-center">
                                            <td className="border px-2 py-1">{key}</td>
                                            <td className="border px-2 py-1">{remarks[key]?.expected}</td>
                                            <td className="border px-2 py-1">{remarks[key]?.remark}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Facultymodel;