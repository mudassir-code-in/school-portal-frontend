import axios from 'axios';
import React, { useState } from 'react';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Profile = ({ user }) => {
  const [showCard, setShowCard] = useState(false);

  async function logout() {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/logout`, { withCredentials: true });
      if (response.data.success) {
         window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
  
    <div className="fixed bottom-6 right-6 z-[100] inline-block text-left select-none">

    
      <div
        className="cursor-pointer active:scale-95 transition-transform duration-150 relative group"
        onClick={() => setShowCard(!showCard)}
      >
      
        <span className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping scale-110 group-hover:bg-indigo-500/30"></span>

        <img
          src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
          alt="User Avatar"
          className="h-12 w-12 rounded-full object-cover ring-4 ring-white border border-slate-200 shadow-xl transition-all duration-200 relative z-10"
        />
      </div>

      
      {showCard && (
        <>
          
          <div className="fixed inset-0 z-40" onClick={() => setShowCard(false)} />

         
          <div className="absolute right-0 bottom-14 w-60 bg-white rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.15),0_8px_15px_-6px_rgba(0,0,0,0.1)] border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">

            {/* User Info */}
            <div className="bg-slate-50 rounded-xl p-3 mb-1">
              <p className="font-bold text-slate-800 text-sm truncate">
                {user?.name || "Anonymous User"}
              </p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5 font-medium">
                {user?.email || "No email provided"}
              </p>
            </div>

         

            {/* Logout */}
            <button
              className="w-full text-left text-xs text-slate-600 hover:text-rose-600 hover:bg-rose-50 px-3 py-2.5 rounded-xl font-bold transition-all duration-150"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;