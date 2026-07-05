import React, { useEffect, useState } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const GetNotice = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/student/get-notice`, {
                    withCredentials: true
                });
                let resData = response.data?.notice || response.data?.data || response.data;
                if (Array.isArray(resData)) {
                    setNotices([...resData].reverse());
                } else if (typeof resData === 'object' && resData !== null) {
                    const keys = Object.keys(resData);
                    if (keys.length > 0 && typeof resData[keys[0]] === 'object') {
                        setNotices(keys.map(key => resData[key]).reverse());
                    } else {
                        setNotices([resData]);
                    }
                } else {
                    setNotices([]);
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Notice load nahi ho paya');
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    if (loading) {
        return (
            <div className="space-y-4 p-4 animate-pulse">
                <div className="flex items-start gap-3 max-w-[80%] bg-slate-100 h-16 rounded-2xl rounded-tl-none"></div>
                <div className="flex items-start gap-3 max-w-[70%] bg-slate-100 h-24 rounded-2xl rounded-tl-none"></div>
            </div>
        );
    }

    if (error) return <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-center text-xs font-medium m-4">⚠️ {error}</div>;
    if (!notices || notices.length === 0) return <div className="p-8 text-slate-400 text-center text-xs">
        There is no new notice at the moment.</div>;

    return (
        <div className="space-y-4 p-2 md:p-4">
            {notices.map((notice, index) => {
                const hasMessage = notice?.message && notice.message.trim() !== "";
                const hasImage = notice?.imageUrl && notice.imageUrl.trim() !== "";

                return (
                    <div
                        key={notice._id || index}
                        className="flex items-start gap-2.5 max-w-[92%] sm:max-w-[85%] md:max-w-[75%]"
                    >
                       
                        <img
                            src={notice.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin'}
                            alt="Admin"
                            className="w-8 h-8 rounded-full object-cover bg-white border border-slate-200 shrink-0"
                        />

                       
                        <div className="bg-slate-100 hover:bg-slate-150/80 rounded-2xl rounded-tl-none p-3 shadow-2xs relative border border-slate-200/40 transition-colors flex flex-col">

                         
                            <div className="flex items-center gap-2 mb-1 shrink-0">
                                <span className="font-extrabold text-[11px] text-indigo-700 tracking-tight">
                                    IDEAL HIGH SCHOOL
                                </span>
                                <span className="inline-block bg-indigo-100 text-indigo-800 text-[8px] font-bold px-1 rounded">
                                    Official
                                </span>
                            </div>

                           
                            {hasImage && (
                                <div
                                    onClick={() => window.open(notice.imageUrl, '_blank')}
                                    className="mb-2 overflow-hidden rounded-xl border border-slate-200/80 cursor-pointer bg-white max-w-full"
                                >
                                    <img
                                        src={notice.imageUrl}
                                        alt="Notice Attachment"
                                        className="w-full h-auto max-h-[280px] object-contain block"
                                    />
                                </div>
                            )}

                     
                            {hasMessage && (
                                <p className="text-slate-800 text-xs md:text-[13px] whitespace-pre-wrap break-words leading-relaxed font-normal pr-8">
                                    {notice.message}
                                </p>
                            )}

                  
                            <div className="self-end text-[9px] text-slate-400 font-medium mt-1 select-none">
                                {notice.createdAt && new Date(notice.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                {notice.createdAt && ` • ${new Date(notice.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}`}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GetNotice;