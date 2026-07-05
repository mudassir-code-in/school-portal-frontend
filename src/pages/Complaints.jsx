import React from 'react'
import Navbar from '../components/Navbar'
import UserComplaints from '../components/AdminDashboardComponents/UserComplaints'

const Complaints = () => {
  return (
    <div>
      <Navbar />

      <div>
        <UserComplaints />
      </div>
    </div>
  )
}

export default Complaints
