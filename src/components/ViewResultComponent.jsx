import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ViewResultComponent = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [className, setClassName] = useState('');
    const [name, setName] = useState('');
    const [year, setYear] = useState('2026');

    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchResult = async (e) => {
        e.preventDefault();
        if (!rollNumber || !className || !name || !year) {
            setError('Bhai saare fields bharna zaroori hai!');
            return;
        }

        setLoading(true);
        setError('');
        setResultData(null);

        const payload = {
            rollNumber: Number(rollNumber),
            className: Number(className) ? Number(className) : className,
            name: name,
            year: year
        };

        try {
            const res = await axios.post(`${backendUrl}/api/result/view-my-result`, payload, { withCredentials: true });

            if (res.data.success && res.data.result) {
                setResultData(res.data.result);
            } else {
                setError('Resul not found check the details');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Server error');
        } finally {
            setLoading(false);
        }
    };

    const convertToTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const downloadPDF = () => {
        try {
            if (!resultData) {
                alert("Resutl Data not avalable for download");
                return;
            }

            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

          
            const primaryColor = "#1a365d"; 
            const darkText = "#1e293b";     
            const lightText = "#64748b";    
            const borderGrey = "#cbd5e1";   

            
            doc.setDrawColor(203, 213, 225);
            doc.setLineWidth(0.5);
            doc.rect(10, 10, 190, 277);


            doc.setFillColor(26, 54, 93); 
            doc.rect(10, 10, 190, 5, 'F');

            
            doc.setTextColor(26, 54, 93);
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(22);
            doc.text('IDEAL HIGH SCHOOL', 105, 28, { align: 'center' });

            doc.setTextColor(100, 116, 139);
            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(8.5);
            doc.text('AFFILIATED TO CENTRAL BOARD OF SECONDARY EDUCATION', 105, 34, { align: 'center' });

            doc.setTextColor(26, 54, 93);
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(12);
            doc.text(`OFFICIAL PROGRESS REPORT CARD — ${resultData.year || year}`, 105, 43, { align: 'center' });

           
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.4);
            doc.line(15, 50, 195, 50);

        
            doc.setTextColor(30, 41, 59);
            doc.setFontSize(10);

            
            doc.setFont('Helvetica', 'bold'); doc.text('Student Name:', 18, 60);
            doc.setFont('Helvetica', 'normal'); doc.text(`${resultData.studentName || resultData.name || 'N/A'}`, 48, 60);

            doc.setFont('Helvetica', 'bold'); doc.text("Father's Name:", 18, 67);
            doc.setFont('Helvetica', 'normal'); doc.text(`${resultData.fatherName || 'N/A'}`, 48, 67);

            doc.setFont('Helvetica', 'bold'); doc.text("Mother's Name:", 18, 74);
            doc.setFont('Helvetica', 'normal'); doc.text(`${resultData.motherName || 'N/A'}`, 48, 74);

         
            doc.setFont('Helvetica', 'bold'); doc.text('Roll Number:', 130, 60);
            doc.setFont('Helvetica', 'normal'); doc.text(`${resultData.rollNumber || rollNumber || 'N/A'}`, 160, 60);

            doc.setFont('Helvetica', 'bold'); doc.text('Class & Sec:', 130, 67);
            doc.setFont('Helvetica', 'normal'); doc.text(`${resultData.className || className || 'N/A'}`, 160, 67);

            doc.setFont('Helvetica', 'bold'); doc.text('Academic Year:', 130, 74);
            doc.setFont('Helvetica', 'normal'); doc.text(`${resultData.year || year || 'N/A'}`, 160, 74);

          
            const subjectsList = resultData.subjects || [];
            const tableBody = subjectsList.map((sub, index) => [
                index + 1,
                sub.subjectName || 'N/A',
                100,
                33,
                sub.obtainedMarks !== undefined ? sub.obtainedMarks : 0
            ]);

           
            autoTable(doc, {
                startY: 82,
                margin: { left: 15, right: 15 },
                head: [['S.No.', 'Subject Name', 'Max Marks', 'Passing Marks', 'Obtained Marks']],
                body: tableBody,
                theme: 'striped',
                headStyles: {
                    fillColor: [26, 54, 93], 
                    halign: 'center',
                    fontSize: 9.5,
                    fontStyle: 'bold',
                    textColor: [255, 255, 255]
                },
                columnStyles: {
                    0: { halign: 'center', cellWidth: 15 },
                    1: { halign: 'left' },
                    2: { halign: 'center', cellWidth: 28 },
                    3: { halign: 'center', cellWidth: 28 },
                    4: { halign: 'center', cellWidth: 32, fontStyle: 'bold' }
                },
                styles: { fontSize: 9.5, cellPadding: 4.5, textColor: [30, 41, 59] },
                didParseCell: function (data) {
                  
                    if (data.column.index === 4 && data.cell.section === 'body') {
                        const marks = parseInt(data.cell.text);
                        if (marks < 33) {
                            data.cell.styles.textColor = [220, 38, 38]; 
                        }
                    }
                }
            });

           
            const finalY = doc.lastAutoTable.finalY + 12;

           
            doc.setDrawColor(203, 213, 225);
            doc.setLineWidth(0.3);
            doc.line(15, finalY, 195, finalY);

            
            doc.setTextColor(30, 41, 59);
            doc.setFontSize(10.5);
            doc.setFont('Helvetica', 'bold'); doc.text(`Total Marks :`, 18, finalY + 8);
            doc.setFont('Helvetica', 'normal'); doc.text(`${resultData.totalMarks || 0} / ${resultData.totalMaxMarks || 0}`, 48, finalY + 8);

            doc.setFont('Helvetica', 'bold'); doc.text(`Percentage :`, 18, finalY + 15);
            doc.setFont('Helvetica', 'normal'); doc.text(`${resultData.percentage || 0}%`, 48, finalY + 15);

            doc.setFont('Helvetica', 'bold'); doc.text(`Final Grade :`, 18, finalY + 22);
            doc.setFont('Helvetica', 'bold'); doc.text(`${resultData.grade || 'N/A'}`, 48, finalY + 22);

          
            const statusText = (resultData.status || 'Pass').toUpperCase();
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(13);
            if (statusText === 'PASS') {
                doc.setTextColor(22, 101, 52); 
            } else {
                doc.setTextColor(185, 28, 28); 
            }
            doc.text(`RESULT: ${statusText}`, 195, finalY + 12, { align: 'right' });

           
            const sigY = finalY + 55; 
            doc.setDrawColor(203, 213, 225);
            doc.setLineWidth(0.4);
            doc.setTextColor(100, 116, 139);
            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(9);

            
            doc.line(15, sigY, 60, sigY);
            doc.text('Class Teacher Sign', 23, sigY + 5);

           
            doc.line(82, sigY, 127, sigY);
            doc.text('Gardian Sign', 89, sigY + 5);

            doc.line(150, sigY, 195, sigY);
            doc.text('Principal Stamp & Sign', 156, sigY + 5);

            
            doc.save(`Official_Result_Roll_${resultData.rollNumber || rollNumber}.pdf`);

        } catch (pdfError) {
            console.error("PDF generation failed:", pdfError);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl border border-slate-100 font-sans">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-slate-800 mb-8 tracking-tight flex items-center justify-center gap-2">
                <span>🔍</span> View Student Report Card
            </h2>

          
            <form onSubmit={handleFetchResult} className="flex flex-col gap-4 mb-8 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-600 px-1">Roll Number</label>
                        <input
                            type="number"
                            placeholder="e.g. 101"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition text-sm text-slate-800"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-600 px-1">Class</label>
                        <select
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none bg-white transition text-sm text-slate-800"
                        >
                            <option value="">-- Select --</option>
                            
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
                    </div>

                    <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
                        <label className="text-xs font-semibold text-slate-600 px-1">Student Full Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Rahul Kumar"
                            value={name}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                
                                if (inputValue.endsWith(' ')) {
                                    setName(inputValue);
                                } else {
                                    setName(convertToTitleCase(inputValue));
                                }
                            }}
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition text-sm text-slate-800"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-600 px-1">Year</label>
                        <input
                            type="text"
                            placeholder="Year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition text-sm text-slate-800"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-lg font-bold text-sm tracking-wide transition duration-200 w-full shadow-md shadow-slate-900/10"
                >
                    {loading ? 'Searching Result...' : 'Get Result'}
                </button>
            </form>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium mb-6 animate-pulse text-sm">
                    ⚠️ {error}
                </div>
            )}

            {/* RESULT VIEW */}
            {resultData && (
                <div className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-lg transition-all duration-300">

                    {/* Brand Banner */}
                    <div className="bg-slate-900 text-white p-6 text-center">
                        <h3 className="text-xl md:text-2xl font-bold tracking-wider m-0">IDEAL HIGH SCHOOL</h3>
                        <p className="text-xs font-light tracking-widest text-slate-300 uppercase mt-1">Annual Progress Report Card ({resultData.year})</p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-50 border-b border-slate-200 text-sm text-slate-700">
                        <div className="space-y-1.5">
                            <p><strong>Student Name:</strong> {resultData.studentName || resultData.name}</p>
                            <p><strong>Father's Name:</strong> {resultData.fatherName || 'N/A'}</p>
                            <p><strong>Mother's Name:</strong> {resultData.motherName || 'N/A'}</p>
                        </div>
                        <div className="md:text-right space-y-1.5">
                            <p><strong>Roll Number:</strong> {resultData.rollNumber}</p>
                            <p><strong>Class:</strong> {resultData.className}</p>
                            <p><strong>Academic Year:</strong> {resultData.year}</p>
                        </div>
                    </div>

                    {/* Core Academic Table Sheet */}
                    <div className="p-5 overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm text-slate-600">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700 uppercase text-xs font-semibold border-b-2 border-slate-200">
                                    <th className="p-3">Subject</th>
                                    <th className="p-3 text-center">Max Marks</th>
                                    <th className="p-3 text-center">Passing Marks</th>
                                    <th className="p-3 text-center">Obtained Marks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {(resultData.subjects || []).map((sub, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                                        <td className="p-3 font-medium text-slate-800">{sub.subjectName}</td>
                                        <td className="p-3 text-center">100</td>
                                        <td className="p-3 text-center">33</td>
                                        <td className={`p-3 text-center font-bold ${sub.obtainedMarks < 33 ? 'text-red-600' : 'text-slate-900'}`}>
                                            {sub.obtainedMarks}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Report Status Footer Strip */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-slate-100 border-t-2 border-slate-200 gap-4">
                        <div className="space-y-1">
                            <h4 className="text-base font-bold text-slate-800">Total Marks: <span className="font-normal">{resultData.totalMarks} / {resultData.totalMaxMarks}</span></h4>
                            <h4 className="text-base font-bold text-slate-800">Percentage: <span className="font-normal">{resultData.percentage}%</span></h4>
                            <h5 className="text-sm font-semibold text-slate-600">Grade: <span className="text-slate-900 font-extrabold text-base">{resultData.grade}</span></h5>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-3">
                            <div className={`text-xl font-black tracking-widest px-4 py-1 rounded-md ${resultData.status?.toLowerCase() === 'pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {resultData.status?.toUpperCase()}
                            </div>

                            <button
                                onClick={downloadPDF}
                                className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow transition-all duration-200"
                            >
                                📥 Download Official PDF
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ViewResultComponent;