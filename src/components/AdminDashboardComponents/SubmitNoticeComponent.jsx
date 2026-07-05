import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; 
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SubmitNoticeComponent = ({ user }) => {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);


    const [chatMessages, setChatMessages] = useState([]);
    const [errorStatus, setErrorStatus] = useState('');
    const fileInputRef = useRef(null);

   
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                
                const response = await axios.get(`${backendUrl}/api/student/get-notice`, {
                    withCredentials: true
                });

 
                let resData = response.data?.notice || response.data?.data || response.data;

                if (Array.isArray(resData)) {
                   
                    setChatMessages([...resData].reverse());
                }
            } catch (err) {
               
                setErrorStatus("Notice not load");
            }
        };
        fetchNotices();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Confirm deletion?")) return;

        try {
           
            const response = await axios.post(
                `${backendUrl}/api/admin/delete-notice`,
                { noticeId: id },
                { withCredentials: true }
            );

            if (response.status === 200) {
              
                setChatMessages((prev) => prev.filter((msg) => msg._id !== id));
                alert(response.data?.message || "Notice deleted");
            } else {
                setErrorStatus("Delete Error!");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            setErrorStatus(error.response?.data?.message || "Delete Error");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() && !image) {
            setErrorStatus('Please write or upload image');
            return;
        }

        setLoading(true);
        setErrorStatus('');

        const formData = new FormData();
        formData.append('message', message);
        if (user?.avatar) formData.append('avatar', user.avatar);
        if (image) formData.append('image', image);

        try {
           
            const response = await axios.post(`${backendUrl}/api/admin/submit-notice`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200 || response.status === 201) {
                if (response.data?.notice) {
                  
                    setChatMessages((prev) => [response.data.notice, ...prev]);
                }
                setMessage('');
                setImage(null);
                setImagePreview(null);
            }
        } catch (error) {
            setErrorStatus(error.response?.data?.message || 'Something went wrong during submission!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col h-[550px]">

        
                <div className="bg-indigo-600 p-4 flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-indigo-600 shadow-sm">
                        AD
                    </div>
                    <div>
                        <h2 className="text-white font-semibold text-lg">Admin Notice Room</h2>
                        <p className="text-indigo-200 text-xs font-medium">Live Broadcast Portal</p>
                    </div>
                </div>

      
                <div className="p-4 bg-gray-50 overflow-y-auto flex-1 space-y-4 flex flex-col">

                    {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-400 text-sm my-auto">
                            Didn't receive any notice. Add a new notice.
                        </div>
                    ) : (
                        chatMessages.map((msg, index) => (
                            <div key={msg._id || index} className="flex items-start gap-2.5 group relative">
                                {/* Profile Avatar */}
                                <img
                                    src={msg.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin'}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full border border-gray-300 bg-white object-cover shadow-sm shrink-0"
                                />

                                <div className="flex flex-col w-full max-w-[280px] p-3 bg-white border border-gray-200 rounded-e-xl rounded-es-xl shadow-sm relative">
               
                                    {msg.message && <p className="text-sm font-normal text-gray-900 break-words pr-4">{msg.message}</p>}

                        
                                    {msg.imageUrl && (
                                        <img
                                            src={msg.imageUrl}
                                            alt="Notice Media"
                                            className="mt-2 rounded-lg max-h-40 w-full object-cover border border-gray-100"
                                        />
                                    )}

                                   
                                    <button
                                        onClick={() => handleDelete(msg._id)}
                                        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 font-bold text-xs bg-gray-50 hover:bg-gray-100 w-5 h-5 flex items-center justify-center rounded-full shadow-xs"
                                        title="Delete Notice"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Error Display */}
                    {errorStatus && (
                        <div className="flex justify-center my-2 sticky bottom-0">
                            <span className="px-4 py-1.5 rounded-full text-xs font-semibold shadow-md bg-red-100 text-red-800 border border-red-300">
                                ⚠️ {errorStatus}
                            </span>
                        </div>
                    )}
                </div>

                {/* Image Preview Area */}
                {imagePreview && (
                    <div className="px-4 py-2 bg-indigo-50 border-t border-gray-100 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-md border border-indigo-200" />
                            <span className="text-xs text-indigo-700 font-medium">Image Atached</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setImage(null); setImagePreview(null); }}
                            className="text-gray-400 hover:text-red-500 text-sm font-bold p-1"
                        >
                            ✕ Remove
                        </button>
                    </div>
                )}

                {/* Form Input Area */}
                <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
                        </svg>
                    </button>

                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a notice message..."
                        className="flex-1 bg-gray-100 text-sm text-gray-800 placeholder-gray-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent focus:bg-white transition"
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`p-2 rounded-full text-white transition ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}`}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitNoticeComponent;