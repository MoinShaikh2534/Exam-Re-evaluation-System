import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Result = () => {
  const { loggedInUser } = useAuth();
  const [data, setData] = useState([]);
  const [totalMarksObtained, setTotalMarksObtained] = useState(0);
  const [totalMaxMarks, setTotalMaxMarks] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/answersheet/result/${loggedInUser._id}`;
        const response = await axios.get(url, { withCredentials: true });

        console.log('Fetched data:', response.data.data.subjectWiseMarks);

        const subjectWiseMarks = response.data.data.subjectWiseMarks || [];

        setData(subjectWiseMarks);

        // Calculate total marks obtained and max marks
        const totalObtained = subjectWiseMarks.reduce((sum, item) => sum + item.obtainedMarks, 0);
        const totalMax = subjectWiseMarks.reduce((sum, item) => sum + item.maxMarks, 0);

        setTotalMarksObtained(totalObtained);
        setTotalMaxMarks(totalMax);

        // Calculate percentage
        const calculatedPercentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : 0;
        setPercentage(calculatedPercentage);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResult();
  }, [loggedInUser]);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg mt-2">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Exam Results</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3">Course Code</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Obtained Marks</th>
            <th className="p-3">Max Marks</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b text-center">
              <td className="p-3">{item.subjectCode}</td>
              <td className="p-3">{item.subjectName}</td>
              <td className="p-3">{item.obtainedMarks}</td>
              <td className="p-3">{item.maxMarks}</td>
            </tr>
          ))}
          <tr className="font-bold text-center bg-gray-200">
            <td className="p-3" colSpan="2">Total</td>
            <td className="p-3">{totalMarksObtained}</td>
            <td className="p-3">{totalMaxMarks}</td>
          </tr>
        </tbody>
      </table>
      <div className='text-right mt-4'>
        <span className="text-xl font-bold">Percentage: {percentage}%</span>
      </div>
    </div>
  );
};

export default Result;
