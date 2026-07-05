import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-auto border-t border-slate-200/60 bg-white/70 backdrop-blur-md text-slate-600">
            {/* Top neon-ambient glow line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Left Side: School/Portal Identity */}
                    <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🏫</span>
                            <span className="font-black text-slate-900 text-lg tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
                                Digital Portal
                            </span>
                            <span className="inline-flex items-center bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                                v1.0
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium max-w-xs">
                            Shaping the future of digital education with fluid experiences.
                        </p>
                    </div>

                    {/* 🐙 RIGHT SIDE: BIGGER FUTURISTIC DEVELOPER CARD */}
                    <div>
                    
                    </div>
                    <motion.a
                        href="https://github.com/mudassir-code-in"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{
                            scale: 1.02,
                            y: -4,
                            boxShadow: "0 25px 30px -10px rgba(15, 23, 42, 0.15)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full md:w-auto min-w-[280px] sm:min-w-[340px] flex items-center gap-4 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 cursor-pointer shadow-xl transition-shadow group relative overflow-hidden"
                    >
                        {/* Ambient Background Grid Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />

                        {/* GitHub Large Icon */}
                        <div className="p-3 rounded-xl bg-slate-800 text-slate-200 group-hover:text-indigo-400 group-hover:bg-slate-800/80 transition-colors duration-300 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="w-6 h-6">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                            </svg>
                        </div>

                        {/* Developer Details & Swag Bio */}
                        <div className="flex flex-col space-y-0.5 text-left">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">
                                Architected By
                            </span>
                            <h4 className="text-base font-black tracking-tight group-hover:text-indigo-300 transition-colors">
                                mudassir-code-in
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[220px]">
                                Turning caffeine into clean code and futuristic interfaces. 🚀
                            </p>
                        </div>

                        {/* Micro Arrow */}
                        <div className="ml-auto text-slate-500 group-hover:text-white transition-colors duration-300 self-center hidden sm:block">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </div>
                    </motion.a>

                </div>

                {/* Divider */}
                <div className="my-6 border-t border-slate-100" />

                {/* Bottom Section: Copyright & Spark */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
                    <p>© {currentYear} IDEAL HIGH SCHOOL. All rights reserved.</p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-1 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-full text-slate-500"
                    >
                        <span>Crafted for Next-Gen Web</span>
                        <motion.span
                            animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="text-indigo-500 text-xs font-bold"
                        >
                            ✦
                        </motion.span>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;