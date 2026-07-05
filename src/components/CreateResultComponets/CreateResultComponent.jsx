import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CreateResultComponent = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');

    const [className, setClassName] = useState('');
    const [year, setYear] = useState('2026');
    const [gender, setGender] = useState('');
    const [category, setCategory] = useState('');
    const [marksState, setMarksState] = useState({});
    const [alert, setAlert] = useState({ text: '', type: '' });

    const [allResults, setAllResults] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/result/view-all-results`, { withCredentials: true });
            const rawData = res.data.results;

            if (Array.isArray(rawData)) {
                setAllResults(rawData);
                const formattedChartData = rawData.map(item => ({
                    name: item.studentName || `Roll ${item.rollNumber}`,
                    "Percentage (%)": item.percentage || 0,
                    totalMarks: item.totalMarks || 0
                }));
                setChartData(formattedChartData);
            }
        } catch (err) {
            console.error("Error loading results from server:", err);
        }
    };

   
    const convertToTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const getDynamicSubjects = () => {
        if (!className) return [];

       

        if (Number(className) >= 1 && Number(className) <= 5) {
            let base = ["Hindi", "English", "Maths", "GK", "Art (Drawing)"];
            if (category === 'Muslim') base.push("Urdu");
            return base;
        }
        if (Number(className) >= 6 && Number(className) <= 8) {
            let base = ["Hindi", "English", "Maths", "Science", "Social Science", "GK", "Art (Drawing)"];
            if (category === 'Muslim') base.push("Urdu");
            if (gender === 'Girl') base.push("Home Science");
            if (gender === 'Boy') base.push("Pustak Kala");
            return base;
        }
        if (className === '9' || className === '10') {
            let base = ["Hindi", "English", "Maths", "Science", "Social Science"];
            if (category === 'Muslim') base.push("Urdu");
            else base.push("Art (Drawing)");
            return base;
        }
        if (className.includes('PCM')) return ["Physics", "Chemistry", "Maths", "English", "Hindi"];
        return [];
    };

    const dynamicSubjectsList = getDynamicSubjects();

    const handleMarksChange = (subName, value) => {
        setMarksState({ ...marksState, [subName]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert({ text: '', type: '' });

        const formattedSubjects = dynamicSubjectsList.map(subName => ({
            subjectName: subName,
            obtainedMarks: Number(marksState[subName] || 0)
        }));

        const payload = {
            rollNumber: Number(rollNumber),
            className: Number(className) ? Number(className) : className,
            name: name.trim(),
            fatherName: fatherName.trim(),
            motherName: motherName.trim(),
            year,
            subjects: formattedSubjects
        };

        try {
            const res = await axios.post(`${backendUrl}/api/result/create-result`, payload, { withCredentials: true });
            if (res.data.success) {
                setAlert({ text: res.data.message || "Data save ho gaya bhai!", type: 'success' });
                setRollNumber('');
                setName('');
                setFatherName('');
                setMotherName('');
                setMarksState({});
                fetchResults();
            }
        } catch (err) {
            const backendErrorMessage = err.response?.data?.message || "Lafa ho gaya backend par!";
            setAlert({ text: backendErrorMessage, type: 'error' });
        }
    };

    const inputStyle = {
        padding: '12px 14px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        fontSize: '14px',
        outline: 'none',
        background: '#f8fafc',
        transition: 'all 0.2s ease',
        width: '100%', 
        boxSizing: 'border-box'
    };

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'center',
            padding: '20px 10px',
            backgroundColor: '#f1f5f9',
            minHeight: '100vh',
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            boxSizing: 'border-box'
        }}>

      
            <div style={{
                width: '100%',
                maxWidth: '480px',
                padding: '25px 20px',
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                background: '#fff',
                boxSizing: 'border-box'
            }}>
                <h2 style={{ textAlign: 'center', color: '#1e293b', margin: '0 0 25px 0', fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>🎯 Create Student Result</h2>

                {alert.text && (
                    <div style={{
                        padding: '14px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '600', textAlign: 'center',
                        backgroundColor: alert.type === 'success' ? '#f0fdf4' : '#fef2f2',
                        color: alert.type === 'success' ? '#166534' : '#991b1b',
                        border: alert.type === 'success' ? '1px solid #bbf7d0' : '1px solid #fca5a5'
                    }}>
                        {alert.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <input type="number" placeholder="Roll Number" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required style={inputStyle} />

                    <input
                        type="text"
                        placeholder="Student Full Name"
                        value={name}
                        onChange={e => setName(convertToTitleCase(e.target.value))}
                        required
                        style={inputStyle}
                    />


                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '12px'
                    }}>
                        <input
                            type="text"
                            placeholder="Father's Name"
                            value={fatherName}
                            onChange={e => setFatherName(convertToTitleCase(e.target.value))}
                            required
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            placeholder="Mother's Name"
                            value={motherName}
                            onChange={e => setMotherName(convertToTitleCase(e.target.value))}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <input type="text" placeholder="Academic Year" value={year} onChange={e => setYear(e.target.value)} required style={inputStyle} />

                    <select value={className} onChange={e => { setClassName(e.target.value); setMarksState({}); }} required style={inputStyle}>
                        <option value="">-- Select Class --</option>
                        <option value="1">Class 1</option>
                        <option value="2">Class 2</option>
                        <option value="3">Class 3</option>
                        <option value="4">Class 4</option>
                        <option value="5">Class 5</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="11th-PCM">11th (PCM)</option>
                    </select>

              
                    {className && !className.includes('PCM') && (
                        <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px dashed #cbd5e1' }}>
                            <select value={category} onChange={e => setCategory(e.target.value)} required style={{ ...inputStyle, background: '#fff' }}>
                                <option value="">-- Select Religion --</option>
                                <option value="Hindu">Hindu / General</option>
                                <option value="Muslim">Muslim (Urdu)</option>
                            </select>

                            {(Number(className) >= 6 && Number(className) <= 8) && (
                                <select value={gender} onChange={e => setGender(e.target.value)} required style={{ ...inputStyle, background: '#fff' }}>
                                    <option value="">-- Select Gender --</option>
                                    <option value="Boy">Boy (Pustak Kala)</option>
                                    <option value="Girl">Girl (Home Science)</option>
                                </select>
                            )}
                        </div>
                    )}

                    {dynamicSubjectsList.length > 0 && (
                        <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                            <h4 style={{ margin: '0 0 14px 0', color: '#1e40af', fontSize: '15px', fontWeight: '600' }}>📚 Enter Marks (Out of 100):</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {dynamicSubjectsList.map(sub => (
                                    <div key={sub} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        <span style={{ fontSize: '13px', fontWeight: '500', color: '#334155' }}>{sub}</span>
                                        <input
                                            type="number" max="100" min="0" placeholder="0"
                                            value={marksState[sub] || ''}
                                            onChange={e => handleMarksChange(sub, e.target.value)}
                                            required
                                            style={{ width: '65px', padding: '6px', textAlign: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '700', color: '#0f172a', background: '#f8fafc' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button type="submit" style={{ padding: '14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '16px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>
                        Submit Result
                    </button>
                </form>
            </div>

         
            <div style={{
                width: '100%',
                maxWidth: '650px',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                boxSizing: 'border-box'
            }}>

              
                <div style={{ padding: '20px 15px', border: 'none', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', background: '#fff' }}>
                    <h3 style={{ margin: '0 0 20px 0', color: '#1e293b', textAlign: 'center', fontWeight: '700', fontSize: '17px' }}>📈 Student Performance Chart (% Marks)</h3>
                    {chartData.length > 0 ? (
                        <div style={{ width: '100%', height: 260 }}>
                            <ResponsiveContainer>
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                                    <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ background: '#1e293b', borderRadius: '8px', color: '#fff', border: 'none', fontSize: '12px' }} itemStyle={{ color: '#38bdf8' }} />
                                    <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                                    <Bar dataKey="Percentage (%)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center', color: '#64748b', padding: '40px 0' }}>Data not found!</p>
                    )}
                </div>

                {/* LIST ZONE WITH DYNAMIC PASS/FAIL STYLING */}
                <div style={{ padding: '20px 15px', border: 'none', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', background: '#fff', maxHeight: '420px', overflowY: 'auto' }}>
                    <h3 style={{ margin: '0 0 20px 0', color: '#1e293b', fontWeight: '700', fontSize: '17px' }}>📋 Checked Results List ({allResults.length} Students)</h3>
                    {allResults.length === 0 ? (
                        <p style={{ color: '#64748b', textAlign: 'center', padding: '40px 0' }}>Results not found.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {allResults.map((res, index) => {
                                const isPass = res.status === 'Pass';
                                const cardColor = isPass ? '#10b981' : '#ef4444';
                                const lightBg = isPass ? '#f0fdf4' : '#fef2f2';

                                return (
                                    <div key={index} style={{
                                        padding: '14px',
                                        background: '#f8fafc',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        border: '1px solid #e2e8f0',
                                        borderLeft: `6px solid ${cardColor}`,
                                        gap: '10px',
                                        flexWrap: 'wrap' 
                                    }}>
                                        <div style={{ flex: '1', minWidth: '200px' }}>
                                            <h5 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>{res.studentName}</h5>
                                            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Father: {res.fatherName} | Mother: {res.motherName}</p>
                                            <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>Roll No: <span style={{ color: '#475569', fontWeight: '600' }}>{res.rollNumber}</span> | Class: <span style={{ color: '#475569', fontWeight: '600' }}>{res.className}</span> | Year: {res.year}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '90px', marginLeft: 'auto' }}>
                                            <span style={{ fontSize: '17px', fontWeight: '700', color: cardColor }}>
                                                {res.percentage}%
                                            </span>
                                            <span style={{ fontSize: '10px', fontWeight: '700', color: cardColor, backgroundColor: lightBg, padding: '3px 8px', borderRadius: '20px', border: `1px solid ${cardColor}30`, textAlign: 'center', width: 'fit-content', marginLeft: 'auto' }}>
                                                {res.status} ({res.grade || 'N/A'})
                                            </span>
                                            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontWeight: '600' }}>{res.totalMarks} / {res.totalMaxMarks}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateResultComponent;