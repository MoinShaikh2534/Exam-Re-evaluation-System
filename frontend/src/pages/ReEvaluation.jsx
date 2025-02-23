// import React, { useState } from "react";
// import { useAuth } from "../contexts/AuthContext";

// useAuth
// const ReEvaluation = () => {
//   const [subjects, setSubjects] = useState({
//     Mathematics: false,
//     Operating_Systems: false,
//     Database_Enggineering: false,
//     Unix_Internals: false,
//     Computer_Algorithms: false
//   });
//   const { loggedInUser } = useAuth();
//   const [transactionId, setTransactionId] = useState('');
//   const [name] = useState(loggedInUser.name);
//   const [prn] = useState(loggedInUser.prn);
//   const [branch] = useState(loggedInUser.department);
//   const handleSubjectChange = (e) => {
//     setSubjects({
//       ...subjects,
//       [e.target.name]: e.target.checked,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const selectedSubjects = Object.keys(subjects).filter(subject => subjects[subject]);
//     alert(`Re-evaluation requested for ${selectedSubjects.join(', ')} with Transaction ID: ${transactionId}`);
//     setSubjects({
//       Mathematics: false,
//       Operating_Systems: false,
//       Database_Enggineering: false,
//       Unix_Internals: false,
//       Computer_Algorithms: false


//     });
//     setTransactionId('');
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-left mb-2 text-gray-700 font-bold">Name:</label>
//           <input type="text" value={name} readOnly className="border p-2 rounded w-full" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-left mb-2 text-gray-700 font-bold">PRN:</label>
//           <input type="text" value={prn} readOnly className="border p-2 rounded w-full" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-left mb-2 text-gray-700 font-bold">Branch:</label>
//           <input type="text" value={branch} readOnly className="border p-2 rounded w-full" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-left mb-2 text-gray-700 font-bold">Subjects:</label>
//           <div className="flex flex-wrap items-start">
//             {Object.keys(subjects).map((subject) => (
//               <label key={subject} className="mb-2 flex items-center mr-4">
//                 <input
//                   type="checkbox"
//                   name={subject}
//                   checked={subjects[subject]}
//                   onChange={handleSubjectChange}
//                   className="mr-2"
//                 />
//                 {subject.replace(/_/g, ' ')}
//               </label>
//             ))}
//           </div>
//         </div>
//         <label className="block text-left mb-2 text-gray-700 font-bold">QR Code for Payment:</label>
//         <div className="mb-4 items-center flex justify-center">
//           <img
//             src="QR.jpg" // Replace with the actual path to your QR code image
//             alt="QR Code"
//             className="border p-2 rounded w-70"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-left mb-2 text-gray-700 font-bold">Transaction ID:</label>
//           <input
//             type="text"
//             value={transactionId}
//             onChange={(e) => setTransactionId(e.target.value)}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//         <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-800">
//           Request Re-evaluation
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReEvaluation;