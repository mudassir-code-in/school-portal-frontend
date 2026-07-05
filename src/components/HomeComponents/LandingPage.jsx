import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import GetNotice from './GetNotice'

const LandingPage = () => {
    
    const navigate = useNavigate();

  
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            }
        }
    };

    const currentYear = new Date().getFullYear();
   
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24 selection:bg-indigo-500 selection:text-white overflow-x-hidden">

            {/* HERO SECTION */}
            <header className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white py-20 px-5 md:px-12">
                {/* Background Tech Orbs for Futuristic Vibe */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto space-y-5 text-center md:text-left relative z-10"
                >
                    <motion.span
                        variants={itemVariants}
                        className="inline-flex items-center bg-white/5 border border-white/10 text-indigo-300 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md"
                    >
                        Academic Year {currentYear} - {currentYear + 1}
                    </motion.span>

                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-3xl"
                    >
                        Welcome to Your <br />
                        <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                            Digital School Portal
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed mx-auto md:mx-0"
                    >

                        Use the options below to view your academic records, download report cards, or contact a teacher regarding any issue.
                    </motion.p>

                    <motion.div variants={itemVariants} className="pt-2">
                        <motion.button
                            whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-shadow cursor-pointer"
                            onClick={() => { navigate('/student-panel') }}
                        >
                            Go to Dashboard
                        </motion.button>
                    </motion.div>
                </motion.div>
            </header>

            {/* WHATSAPP-STYLE CENTRAL FEED BOX */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.4 }}
                className="max-w-4xl mx-auto px-4 md:px-6 mt-8 md:mt-12 relative z-20"
            >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[500px]">

                    {/* Header Box (WhatsApp Top Bar Style) */}
                    <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
                                🏫
                            </div>
                            <div>
                                <h2 className="text-sm md:text-base font-bold tracking-tight">Official Notice Board</h2>
                                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online Updates
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages Body Container */}
                    <div className="flex-1 overflow-y-auto bg-[#efeae2] p-4 space-y-4 custom-scrollbar">
                        <GetNotice />
                    </div>
                </div>
            </motion.section>

            {/* PORTAL LINK OPTIONS */}
            <main className="max-w-4xl mx-auto px-4 md:px-6 mt-8 grid md:grid-cols-2 gap-6">

                {/* REPORT CARD */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                    whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.1)" }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 transition-shadow flex flex-col justify-between group"
                >
                    <div className="space-y-3">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold border border-indigo-100 group-hover:scale-110 transition-transform duration-300">
                            📊
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Academic Report Cards</h3>
                        <p className="text-slate-500 text-xs leading-relaxed pb-2">

                            Download your annual report card securely from here.
                        </p>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/view-my-result')}
                        className="w-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        View Report Card <motion.span className="inline-block" whileHover={{ x: 4 }}>→</motion.span>
                    </motion.button>
                </motion.div>

                {/* COMPLAINT */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
                    whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(244, 63, 94, 0.1)" }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 transition-shadow flex flex-col justify-between group"
                >
                    <div className="space-y-3">
                        <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-xl font-bold border border-rose-100 group-hover:scale-110 transition-transform duration-300">
                            ✍️
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Teacher Connect</h3>
                        <p className="text-slate-500 text-xs leading-relaxed pb-2">

                            Visit our dedicated portal to register any issue, feedback, or complaint.
                        </p>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/submit-complaint')}
                        className="w-full bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        File a Complaint <motion.span className="inline-block" whileHover={{ x: 4 }}>→</motion.span>
                    </motion.button>
                </motion.div>
            </main>

        </div>
    )
}

export default LandingPage