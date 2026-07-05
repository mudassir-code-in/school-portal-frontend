import React, { useState } from 'react';
import axios from 'axios'; 
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SubmitComplaintComponent = () => {
   
    const [formData, setFormData] = useState({
        teacherName: '',
        className: '',
        complaint: '',
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [error, setError] = useState(null);

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage(null);
        setError(null);

        try {
           
            const response = await axios.post(`${backendUrl}/api/student/submit-complaint`, formData, {withCredentials: true});


            if (response.data && response.data.createComplaint) {
                setResponseMessage(response.data.createComplaint);
                
                setFormData({ teacherName: '', className: '', complaint: '' });
            }
        } catch (err) {
        
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Backend server connection error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    Register Your Complaint
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Share your issue here; prompt action will be taken.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-slate-100">
                    <form className="space-y-6" onSubmit={handleSubmit}>

     
                        <div>
                            <label htmlFor="teacherName" className="block text-sm font-semibold text-slate-700">
                                Teacher Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="teacherName"
                                    name="teacherName"
                                    type="text"
                                    required
                                    value={formData.teacherName}
                                    onChange={handleChange}
                                    placeholder="e.g. HC Verma"
                                    className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-150"
                                />
                            </div>
                        </div>

                        {/* Class Name Input */}
                        <div>
                            <label htmlFor="className" className="block text-sm font-semibold text-slate-700">
                                Class Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="className"
                                    name="className"
                                    type="number"
                                    required
                                    value={formData.className}
                                    onChange={handleChange}
                                    placeholder="e.g. 7, 8, 9"
                                    className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-150"
                                />
                            </div>
                        </div>

                        {/* Complaint Textarea */}
                        <div>
                            <label htmlFor="complaint" className="block text-sm font-semibold text-slate-700">
                                Complaint Details
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="complaint"
                                    name="complaint"
                                    rows="4"
                                    required
                                    value={formData.complaint}
                                    onChange={handleChange}
                                    placeholder="Write down the details of your complaint..."
                                    className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-150 resize-none"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Submitting...</span>
                                    </div>
                                ) : (
                                    'Submit Complaint'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Success Response Alert */}
                    {responseMessage && (
                        <div className="mt-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-bold text-emerald-800">Complaint Registered Successfully!</h3>
                                    <div className="mt-2 text-xs text-emerald-700 space-y-1">
                                        <p><strong>Teacher:</strong> {responseMessage.teacherName}</p>
                                        <p><strong>Class:</strong> {responseMessage.className}</p>
                                        <p><strong>Issue:</strong> {responseMessage.complaint}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Alert */}
                    {error && (
                        <div className="mt-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-rose-800">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SubmitComplaintComponent;
