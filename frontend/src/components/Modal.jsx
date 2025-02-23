import React, { useState } from "react";
import pdfFile from '../../../backend/uploads/Maths_rotated.pdf'
import Remark from "./Remark";
const Modal = ({ show, onClose, data, fileUniqueName }) => {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [remarks, setRemarks] = useState({});
    console.log('data: ', data);
    console.log('fileUniqueName', fileUniqueName);


    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75  flex items-center justify-center z-50">
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
                        <div className=" overflow-auto border rounded-lg">
                            <iframe
                                src={pdfFile}
                                width="100%"
                                height="650px"
                            ></iframe>

                        </div>

                    </div>

                    {/* Right Side: Marks Table & Remarks */}
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
                                {data.questionMarks?.map((mark, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="border px-2 py-1">{mark.questionNumber}</td>
                                        <td className="border px-2 py-1">{mark.marksObtained}</td>
                                        <td className="border px-2 py-1">{mark.maxMarks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Remarks Section */}
                         <Remark/>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Modal;
