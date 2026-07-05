import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${backendUrl}/api/admin/get-complaints`, {
                    withCredentials: true,
                });


                let fetchedData = [];

                if (response.data) {
                    if (Array.isArray(response.data)) {
                        fetchedData = response.data;
                    } else if (Array.isArray(response.data.complaints)) {
                        fetchedData = response.data.complaints;
                    } else if (Array.isArray(response.data.data)) {
                        fetchedData = response.data.data;
                    } else {

                        const firstArrayKey = Object.keys(response.data).find(key => Array.isArray(response.data[key]));
                        if (firstArrayKey) {
                            fetchedData = response.data[firstArrayKey];
                        }
                    }
                }

                setComplaints(fetchedData);


                const teacherCount = {};
                fetchedData.forEach((item) => {
                    const name = item.teacherName || 'Unknown';
                    teacherCount[name] = (teacherCount[name] || 0) + 1;
                });

                const formattedChartData = Object.keys(teacherCount).map((key) => ({
                    name: key,
                    count: teacherCount[key],
                }));

                setChartData(formattedChartData);
            } catch (err) {

                setError('Data fetch error');
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="bg-rose-50 text-rose-800 px-6 py-4 rounded-xl border border-rose-200 shadow-sm font-medium">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 sm:p-10 font-sans">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header section */}
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Complaints Dashboard</h1>
                    <p className="mt-2 text-sm text-slate-600">Students ki taraf se aayi hui complaints ka pura analytics aur list.</p>
                </div>

              
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 mb-6">Complaints Analytics (Per Teacher)</h2>

                    {chartData.length > 0 ? (
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm py-10 text-center">No data</p>
                    )}
                </div>

                {/* Complaints List Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-800">All Registered Complaints</h2>
                        <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Total: {complaints.length}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        {complaints.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
                                        <th className="px-6 py-4">Teacher Name</th>
                                        <th className="px-6 py-4">Class Name</th>
                                        <th className="px-6 py-4">Complaint</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {complaints.map((item, index) => (
                                        <tr key={item._id || index} className="hover:bg-slate-50/50 transition duration-150">
                                            <td className="px-6 py-4 font-medium text-slate-900">{item.teacherName}</td>
                                            <td className="px-6 py-4 text-slate-500">{item.className}</td>
                                            <td className="px-6 py-4 max-w-md break-words text-slate-600">{item.complaint}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-12 text-slate-500">

                                No complaint was found registered.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserComplaints;
