import React from 'react'
import Navbar from '../components/Navbar'
import CreateResultComponent from '../components/CreateResultComponets/CreateResultComponent'
import DeleteResultComponent from '../components/CreateResultComponets/DeleteResultComponent'

const CreateResult = () => {
  return (
    <div>
      <Navbar />
      <div>
        
    <div>
      <CreateResultComponent />
    </div>

    <div>
      <DeleteResultComponent />
    </div>


      </div>
    </div>
  )
}

export default CreateResult
