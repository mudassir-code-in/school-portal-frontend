import React, { useState, useEffect } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

const TeachersChart = () => {
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    
    const ROLE_COLORS = {
        STUDENT: '#3b82f6', 
        TEACHER: '#10b981', 
        ADMIN: '#f59e0b',   
    };

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${backendUrl}/api/admin/all-people`, { withCredentials: true });

                if (response.data.success) {
          
                    const users = response.data.users || response.data.data || [];

             
                    const roleCounts = { STUDENT: 0, TEACHER: 0, ADMIN: 0 };

        
                    const monthlyGroup = {};
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    users.forEach(user => {
                        // Role sorting
                        const role = (user.role || 'student').toUpperCase();
                        if (roleCounts[role] !== undefined) {
                            roleCounts[role]++;
                        } else {
                            roleCounts[role] = 1; 
                        }

                     
                        if (user.createdAt) {
                            const date = new Date(user.createdAt);
                            const monthStr = monthNames[date.getMonth()]; 
                            const yearStr = date.getFullYear();          
                            const key = `${monthStr} ${yearStr}`;

                            if (!monthlyGroup[key]) {
                                monthlyGroup[key] = { name: key, Students: 0, Teachers: 0 };
                            }

                            if (role === 'STUDENT') monthlyGroup[key].Students++;
                            if (role === 'TEACHER') monthlyGroup[key].Teachers++;
                        }
                    });

                  
                    const formattedPie = Object.keys(roleCounts)
                        .filter(role => roleCounts[role] > 0)
                        .map(role => ({
                            name: role,
                            value: roleCounts[role],
                            color: ROLE_COLORS[role] || '#8b5cf6'
                        }));

                   
                    const formattedBar = Object.values(monthlyGroup);

                    setPieData(formattedPie);
                    setBarData(formattedBar);
                }
            } catch (err) {
               
                setError('Data filter and compile error!');
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-gray-100 shadow-sm h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600"></div>
                <p className="mt-3 text-sm font-semibold text-gray-500 animate-pulse">Fetching Data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl font-bold text-sm">
                ❌ {error}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">

            {/*  CHART 1: MONTHLY ONBOARDING TRENDS (Bar) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl lg:col-span-2">
                <div className="mb-4">
                    <h3 className="text-base font-extrabold text-gray-800">Monthly Registration Trend</h3>
                    <p className="text-xs text-gray-400 font-medium">Track new student admissions and teacher hirings month-on-month.</p>
                </div>

                <div className="w-full h-72">
                    {barData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                                <Legend verticalAlign="top" height={36} iconType="circle" />
                                {/* Multi-Bars: Dono side-by-side dikhenge */}
                                <Bar dataKey="Students" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={25} />
                                <Bar dataKey="Teachers" fill="#10b981" radius={[6, 6, 0, 0]} barSize={25} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-sm text-center text-gray-400 pt-20">No timeline data available</p>
                    )}
                </div>
            </div>

            {/* 🍕 CHART 2: SYSTEM ROLE SHARE (Pie) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
                <div className="mb-4">
                    <h3 className="text-base font-extrabold text-gray-800">Total Ecosystem Distribution</h3>
                    <p className="text-xs text-gray-400 font-medium">Overall head-count distribution across departments.</p>
                </div>

                <div className="w-full h-72 flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="80%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={85}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`${value} Members`, name]} contentStyle={{ borderRadius: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Custom Labels for Indicators */}
                    <div className="flex gap-4 text-xs font-semibold mt-2 justify-center flex-wrap">
                        {pieData.map((item, idx) => (
                            <span key={idx} className="flex items-center gap-1.5" style={{ color: item.color }}>
                                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.color }}></span>
                                {item.name}: {item.value}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TeachersChart;