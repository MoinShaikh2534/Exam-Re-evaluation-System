import React, { useState } from "react";

const Remark = () => {
    // State for checkboxes
    const [checkedItems, setCheckedItems] = useState(Array(10).fill(false));

    // State for dropdowns
    const [dropdownValues, setDropdownValues] = useState(Array(10).fill(""));

    // State for remarks (one for each question)
    const [remarks, setRemarks] = useState(Array(10).fill(""));
    const [requestedMarks, setRequestedMarks] = useState([]);
    // Handle checkbox change
    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    // Handle remark change
    const handleRemarkChange = (index, value) => {
        const newRemarks = [...remarks];
        newRemarks[index] = value;
        setRemarks(newRemarks);
    };

    // Handle form submission
    const handleSubmit = () => {
        console.log("Checked Items:", checkedItems);
        console.log("Dropdown Values:", dropdownValues);
        console.log("Remarks:", remarks);
        checkedItems.forEach((item, index) => {
            if (item) {
                requestedMarks.push({
                    questionNumber: index + 1,
                    requestedMarks: parseInt(dropdownValues[index]),
                    description: remarks[index],
                });
            }
        });
        console.log("Requested Marks:", requestedMarks);
        alert("Form submitted! Check the console for details.");
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold">Submit Remarks</h3>

            {/* Checkboxes, Dropdowns, and Remarks */}
            {[...Array(10)].map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col space-y-2 mt-4 border p-3 rounded-lg shadow-md"
                >
                    <div className="flex items-center space-x-4">
                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            checked={checkedItems[index]}
                            onChange={() => handleCheckboxChange(index)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />

                        {/* Dropdown (1-5) */}
                        <select
                            value={dropdownValues[index]}
                            onChange={(e) => {
                                const newDropdownValues = [...dropdownValues];
                                newDropdownValues[index] = e.target.value;
                                setDropdownValues(newDropdownValues);
                            }}
                            className="border p-2 rounded"
                        >
                            <option value="">Select</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>

                        {/* Label */}
                        <label className="text-sm">Question {index + 1}</label>
                    </div>

                    {/* Remark Textarea */}
                    <textarea
                        value={remarks[index]}
                        onChange={(e) =>
                            handleRemarkChange(index, e.target.value)
                        }
                        className="w-full border p-2 rounded h-16"
                        placeholder={`Remark for Question ${index + 1}...`}
                    />
                </div>
            ))}

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-800"
            >
                Submit
            </button>
        </div>
    );
};

export default Remark;
