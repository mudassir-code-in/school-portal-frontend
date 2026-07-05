import React from 'react'
import Navbar from '../components/Navbar'
import SubmitNoticeComponent from '../components/AdminDashboardComponents/SubmitNoticeComponent'

const SubmitNotice = ({user}) => {
  return (
    <div>
      <Navbar />

      <div>
        <SubmitNoticeComponent user={user} />
      </div>
    </div>
  )
}

export default SubmitNotice
