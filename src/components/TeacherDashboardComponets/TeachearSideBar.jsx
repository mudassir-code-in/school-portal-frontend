import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeachearSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 🚀 TEACHER SPECIAL OPTIONS (SARA MAAL OBJECT ME)
  const menuItems = [
    {
      id: 1,
      label: 'Create Result',
      path: '/create-result',
      hoverColor: 'hover:bg-violet-50 hover:text-violet-700',
      iconColor: 'group-hover:text-violet-600',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      )
    },
  ];

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* 🔘 Main Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all active:scale-95 shadow-md"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>Open Teacher Panel</span>
      </button>

      {/* 🖤 Backdrop Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 🚪 Left Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out border-r border-gray-100
          w-72 sm:w-80 max-w-[calc(100vw-3rem)] flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* 📑 Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Teacher Control</h2>
            <p className="text-xs text-gray-400 font-medium">Manage classes & academic records</p>
          </div>
          {/* ❌ Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 🚀 Sidebar Body */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-gray-700 rounded-xl transition-all duration-150 group text-left ${item.hoverColor}`}
            >
              <svg 
                className={`w-5 h-5 text-gray-400 transition-colors ${item.iconColor}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                {item.icon}
              </svg>
              {item.label}
            </button>
          ))}
        </div>

       
      </div>
    </>
  );
};

export default TeachearSideBar;
