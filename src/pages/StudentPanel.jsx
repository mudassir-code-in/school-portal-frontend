import React from 'react'
import Navbar from '../components/Navbar'
import StudentPanelComponent from '../components/StudentPanelComponent'

const StudentPanel = ({user}) => {
  return (
    <div>
      <Navbar />

      <div>
        <StudentPanelComponent user={user}/>
      </div>
    </div>
  )
}

export default StudentPanel
