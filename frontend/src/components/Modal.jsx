import React, { useState } from "react";
import pdfFile from "../../../backend/uploads/Maths_rotated.pdf";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Modal = ({
    show,
    onClose,
    data,
    fileUniqueName,
    reloadCount,
    setReloadCount,
    qrCodeImageUrl,
}) => {
    const [remarks, setRemarks] = useState({});
    const [showQRCode, setShowQRCode] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    if (!show) return null;

    // Function to handle remark change
    const handleRemarkChange = (questionNumber, updatedRemark) => {
        setRemarks((prevRemarks) => ({
            ...prevRemarks,
            [questionNumber]: {
                ...prevRemarks[questionNumber], // Preserve existing values
                ...updatedRemark, // Update only the changed field
            },
        }));
    };

    // Calculate total payment (₹50 per question where expected marks are entered)
    const totalPayment = Object.values(remarks).reduce((sum, remark) => {
        return sum + (remark.expected ? 50 : 0);
    }, 0);

    // Function to handle mark submission
    const handleMarkSubmit = async () => {
        // Create requestedMarks array from remarks
        const requestedMarks = Object.entries(remarks)
            .filter(([_, remark]) => remark.expected) // Only include questions with expected marks
            .map(([questionNumber, remark]) => ({
                questionNumber: parseInt(questionNumber),
                requestedMarks: parseInt(remark.expected),
                description: remark.remark || "i think marks will increase", // Use provided remark or default text
            }));

        const requestBody = {
            studentId: data.studentId,
            answerSheetId: data._id,
            paymentAmount: totalPayment.toString(),
            transactionId: transactionId,
            requestedMarks: requestedMarks,
        };
        console.log("Request body:", requestBody);
        try {
            console.log("Request body:", requestBody);
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/reeval/apply",
                requestBody,
                { withCredentials: true },
            );
            console.log("Response:", response.data.data);
            // alert("Request submitted successfully!");
            setReloadCount(reloadCount + 1);

            toast.success("Request submitted successfully!"); // ✅ Toast Notification

            onClose();
        } catch (error) {
            console.log("Error submitting marks:", error);
            // alert("Error submitting marks. Please try again later.");
            toast.error("Error submitting request"); // ✅ Toast Notification
        }
    };

    const handleQRCodeClick = () => {
        setShowQRCode(true);
    };

    return (
        <>
            {/* ✅ Ensure Toaster is properly placed */}
            <Toaster position="top-center" reverseOrder={false} />

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
                            <iframe
                                src={pdfFile}
                                width="100%"
                                height="650px"
                                className="border rounded-lg"
                            ></iframe>
                        </div>

                        {/* Right Side: Marks Table & Remarks */}
                        <div className="w-1/3 bg-gray-50 p-4 overflow-y-auto border-l">
                            <h3 className="text-lg font-bold mb-2">
                                Marks Table
                            </h3>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border px-2 py-1">
                                            Q. No
                                        </th>
                                        <th className="border px-2 py-1">
                                            Obtained
                                        </th>
                                        <th className="border px-2 py-1">
                                            Max
                                        </th>
                                        <th className="border px-2 py-1">
                                            Expected
                                        </th>
                                        <th className="border px-3 py-2">
                                            Remark
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.questionMarks?.map((mark, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border px-2 py-1">
                                                {mark.questionNumber}
                                            </td>
                                            <td className="border px-2 py-1">
                                                {mark.marksObtained}
                                            </td>
                                            <td className="border px-2 py-1">
                                                {mark.maxMarks}
                                            </td>
                                            <td className="border px-2 py-1">
                                                <input
                                                    type="number"
                                                    value={
                                                        remarks[
                                                            mark.questionNumber
                                                        ]?.expected || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleRemarkChange(
                                                            mark.questionNumber,
                                                            {
                                                                expected:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        )
                                                    }
                                                    className="p-2 border rounded w-full"
                                                    min="0"
                                                    max={mark.maxMarks}
                                                />
                                            </td>
                                            <td className="border px-4 py-3 min-w-[200px]">
                                                <input
                                                    type="text"
                                                    value={
                                                        remarks[
                                                            mark.questionNumber
                                                        ]?.remark || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleRemarkChange(
                                                            mark.questionNumber,
                                                            {
                                                                remark: e.target
                                                                    .value,
                                                            },
                                                        )
                                                    }
                                                    className="p-2 border rounded w-full"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Total Payment */}
                            <div className="mt-4 text-lg font-bold text-center">
                                Total Payment: ₹{totalPayment.toFixed(2)}
                            </div>

                            {/* QR Code Button */}
                            {!showQRCode && (
                                <button
                                    onClick={handleQRCodeClick}
                                    className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300"
                                >
                                    Generate QR Code
                                </button>
                            )}

                            {showQRCode && (
                                <div className="mt-4">
                                    <img
                                        src={qrCodeImageUrl}
                                        alt="QR Code"
                                        className="w-70 h-90 mx-auto"
                                    />
                                    <div className="mt-4">
                                        <label
                                            htmlFor="transactionId"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Transaction ID
                                        </label>
                                        <input
                                            type="text"
                                            id="transactionId"
                                            value={transactionId}
                                            onChange={(e) =>
                                                setTransactionId(e.target.value)
                                            }
                                            className="mt-1 block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your transaction ID"
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleMarkSubmit}
                                className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
