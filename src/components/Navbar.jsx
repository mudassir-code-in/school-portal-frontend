import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

  
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPortalOpen, setIsPortalOpen] = useState(false);

    return (
 
        <nav className="sticky top-0 z-50 w-full backdrop-blur-3xl bg-white/[0.12] border-b border-white/[0.15] shadow-[0_8px_32px_0_rgba(0,0,0,0.03)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                 
                    <div
                        className="flex-shrink-0 flex items-center cursor-pointer active:scale-95 transition-transform duration-150"
                        onClick={() => navigate('/home')}
                    >
                        <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 bg-clip-text text-transparent tracking-tight sm:text-2xl">
                            Ideal High School
                        </span>
                    </div>

                  
                    <div className="hidden md:flex items-center space-x-2">

                  
                        <button
                            onClick={() => navigate('/home')}
                            className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                        >
                            Home
                        </button>

                     
                        <div className="relative">
                            <button
                                onClick={() => setIsPortalOpen(!isPortalOpen)}
                                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none ${isPortalOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                Portal
                                <svg className={`h-4 w-4 transform transition-transform duration-200 ${isPortalOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                           
                            {isPortalOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08),0_8px_15px_-6px_rgba(0,0,0,0.05)] border border-slate-100/80 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                    <button
                                        onClick={() => { navigate('/admin-dash'); setIsPortalOpen(false); }}
                                        className="w-full text-left px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
                                    >
                                        Admin Portal
                                    </button>
                                    <button
                                        onClick={() => { navigate('/teacher-dash'); setIsPortalOpen(false); }}
                                        className="w-full text-left px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"
                                    >
                                        Teacher Portal
                                    </button>
                                </div>
                            )}
                        </div>

                    
                        

                       
                        <button
                            onClick={() => navigate('/student-panel')}
                            className="p-2 rounded-xl bg-blue-600  hover:bg-blue-700 text-white active:scale-95 transition-all duration-200 focus:outline-none"
                            title="More Settings"
                        >
                            Dashboard
                        </button>
                    </div>

                    
                    <div className="md:hidden flex items-center space-x-1">
                        {/* Mobile 3-dots */}
                        <button
                            onClick={() => navigate('/student-panel')}
                            className="p-2 rounded-xl bg-blue-600 text-white"
                        >
                            Student Panel
                        </button>

                        {/* Hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 focus:outline-none transition-all duration-150"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

          
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/95 border-t border-slate-100 px-4 py-3 space-y-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                        onClick={() => { navigate('/home'); setIsMobileMenuOpen(false); }}
                        className="w-full text-left block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                    >
                         Home
                    </button>

                    <div className="h-[1px] bg-slate-100 my-2" />

                    <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Portals</p>

                    <button
                        onClick={() => { navigate('/admin-dash'); setIsMobileMenuOpen(false); }}
                        className="w-full text-left block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 pl-6 transition"
                    >
                         Admin Portal
                    </button>
                    <button
                        onClick={() => { navigate('/teacher-dash'); setIsMobileMenuOpen(false); }}
                        className="w-full text-left block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 pl-6 transition"
                    >
                         Teacher Portal
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;