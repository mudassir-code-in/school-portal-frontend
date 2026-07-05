import React, { useState } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const DeleteResultComponent = () => {
    const [studentName, setStudentName] = useState('');
    const [className, setClassName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [year, setYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

   
    const handleNameChange = (e) => {
        const value = e.target.value;
        const capitalizedValue = value
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        setStudentName(capitalizedValue);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

   
        const payload = {
            studentName: studentName.trim(),
            className: Number(className),
            rollNumber: Number(rollNumber),
            year: Number(year)
        };

      

        try {
            
            const response = await axios.post(
                `${backendUrl}/api/result/delete-result`,
                payload,
                { withCredentials: true }
            );

            setIsError(false);
            setMessage(response.data?.message || 'Result successfully deleted!');

        
            setStudentName('');
            setClassName('');
            setRollNumber('');
            setYear('');
        } catch (error) {
            console.error("Full Error Object:", error);
            setIsError(true);

            const backendMessage = error.response?.data?.message
                || error.response?.data
                || error.message
                || 'Something went wrong!';

            setMessage(typeof backendMessage === 'object' ? JSON.stringify(backendMessage) : backendMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white  rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Delete Student Result</h2>

            <form onSubmit={handleDelete} className="space-y-4">
             
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                    <input
                        type="text"
                        value={studentName}
                        onChange={handleNameChange}
                        placeholder="Enter Student Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                        required
                    />
                </div>

                {/* Class Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                    <input
                        type="number"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="Enter Class (e.g. 10)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                        required
                    />
                </div>

                {/* Roll Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                    <input
                        type="number"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        placeholder="Enter Roll Number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                        required
                    />
                </div>

                {/* Year */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Enter Year"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:bg-gray-400"
                >
                    {loading ? 'Processing...' : 'Delete Result'}
                </button>
            </form>

            {message && (
                <div className={`mt-4 p-3 rounded-md text-sm font-semibold text-center ${isError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default DeleteResultComponent;