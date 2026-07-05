import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    const menuItems = [
        {
            id: 1,
            label: 'Add / Delete Teacher',
            path: '/admin/add-remove-teacher',
            hoverColor: 'hover:bg-emerald-50 hover:text-emerald-700',
            iconColor: 'group-hover:text-emerald-600',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            )
        },
        {
            id: 2,
            label: 'Add Notice',
            path: '/admin/submit-notice',
            hoverColor: 'hover:bg-amber-50 hover:text-amber-700',
            iconColor: 'group-hover:text-amber-600',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            )
        },
        {
            id: 3,
            label: 'Create Result',
            path: '/create-result',
            hoverColor: 'hover:bg-violet-50 hover:text-violet-700',
            iconColor: 'group-hover:text-violet-600',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            )
        },
        
        {
            id: 4,
            label: 'User Complaints',
            path: '/admin/complaints',
            hoverColor: 'hover:bg-rose-50 hover:text-rose-700',
            iconColor: 'group-hover:text-rose-600',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            )
        }
    ];

    const handleNavigation = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <>

            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-md"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Open Admin Panel</span>
            </button>

        
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            <div
                className={`fixed top-0 left-0 h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out border-r border-gray-100
          w-72 sm:w-80 max-w-[calc(100vw-3rem)] flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* 📑 Sidebar Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Admin Control</h2>
                        <p className="text-xs text-gray-400 font-medium">Manage system data</p>
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

export default AdminSidebar;