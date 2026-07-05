import React from 'react';
import { useNavigate } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const StudentPanelComponent = ({user}) => {
    const navigate = useNavigate();

   
    const studentName = user.name; 

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            
         
            <div className="max-w-6xl mx-auto px-4 py-8">
                
               
                <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6 md:p-8 rounded-2xl shadow-xl mb-10">
                    <h1 className="text-2xl md:text-4xl font-bold mb-2">
                        Hey, {studentName}! 👋
                    </h1>
                    <p className="text-slate-300 text-sm md:text-base font-medium">
                        Ideal High School • Student Portal Dashboard
                    </p>
                </div>

                {/* 🎯 Dashboard Grid Section */}
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                        Quick Actions & Services
                    </h3>
                    
                    {/* Grid Layout for Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* 📊 Card 1: View Result */}
                        <div 
                            onClick={() => navigate('/view-my-result')}
                            className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                                        View Report Card
                                    </h4>
                                    <p className="text-sm text-slate-500">
                                        Check your academic results, total marks, and final grades.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div 
                            onClick={() => navigate('/submit-complaint')}
                            className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-rose-600 transition-colors">
                                        Register Complaint
                                    </h4>
                                    <p className="text-sm text-slate-500">
                                        Submit any issues or feedback directly to the school administration.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 🕳️ Blank Space Left Intentionally For Future Features */}
                <div className="mt-12 border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-slate-50/50 min-h-[250px]">
                    <div className="text-slate-400 font-medium mb-1">
                        🚀 Additional Services
                    </div>
                    <p className="text-xs text-slate-400 max-w-sm">
                        This section is reserved for future portal updates and newly added student modules.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default StudentPanelComponent;