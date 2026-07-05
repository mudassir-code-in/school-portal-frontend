import React from 'react'
import Navbar from '../components/Navbar'
import AdminSidebar from '../components/AdminDashboardComponents/AdminSideBar'
import TeachersChart from '../components/AdminDashboardComponents/PeopleChart'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">

      <Navbar />

     
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in duration-300">

      
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 bg-white rounded-2xl shadow-sm border border-gray-100">

      
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 font-medium">
              Welcome back! Manage your teachers and school controls here.
            </p>
          </div>

          
          <div className="flex items-center sm:shrink-0">
           
            <AdminSidebar />
          </div>

        </div>

      
        <div className="">
          <TeachersChart />
          
        </div>

      </main>
    </div>
  )
}

export default AdminDashboard
