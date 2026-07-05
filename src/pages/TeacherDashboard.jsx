import React from 'react'
import Navbar from '../components/Navbar'
import TeachearSideBar from '../components/TeacherDashboardComponets/TeachearSideBar'
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">

      <Navbar />


      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in duration-300">


        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 bg-white rounded-2xl shadow-sm border border-gray-100">

    
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Teacher Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 font-medium">
              Welcome back! Manage your teachers and school controls here.
            </p>
          </div>


          <div className="flex items-center sm:shrink-0">

            <TeachearSideBar />
          </div>

        </div>


        <div className="mt-8 border-2 border-dashed border-gray-200 rounded-2xl h-96 flex flex-col items-center justify-center text-gray-400 font-medium bg-white/50 p-6 relative overflow-hidden">

     
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-300 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300 rounded-full blur-2xl"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="z-10 flex flex-col items-center text-center max-w-md"
          >
            {/* Welcome Badge */}
            <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100 uppercase tracking-wider mb-4">
              Teacher's Corner 
            </span>

            {/* Main Heading */}
            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
              Welcome
            </h3>

            <p className="text-sm text-gray-500 font-normal mt-2 px-4">
             Mnage Report cart
            </p>

     
            <div className="flex gap-4 mt-6 w-full justify-center">
              {/* Mini Card 1 */}
              <motion.div
                whileHover={{ y: -3, size: 1.02 }}
                className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center min-w-[100px]"
              >
                <span className="text-2xl">📚</span>
                <span className="text-xs text-gray-400 mt-1">Classes</span>
                <span className="text-sm font-bold text-gray-700">Active</span>
              </motion.div>

              {/* Mini Card 2 */}
              <motion.div
                whileHover={{ y: -3, size: 1.02 }}
                className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center min-w-[100px]"
              >
                <span className="text-2xl">🎯</span>
                <span className="text-xs text-gray-400 mt-1">Tasks</span>
                <span className="text-sm font-bold text-gray-700">Pending</span>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, size: 1.02 }}
                className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center min-w-[100px]"
              >
                <span className="text-2xl">👥</span>
                <span className="text-xs text-gray-400 mt-1">Students</span>
                <span className="text-sm font-bold text-gray-700">Online</span>
              </motion.div>
            </div>

            {/* Bottom Live Pulse Text */}
            <div className="mt-8 flex items-center space-x-2 text-xs text-gray-400 font-normal bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             
            </div>

          </motion.div>
        </div>

      </main>
    </div>
  )
}

export default TeacherDashboard
