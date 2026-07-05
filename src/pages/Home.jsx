import React from 'react'
import Navbar from '../components/Navbar'
import Profile from '../components/HomeComponents/Profile'
import LandingPage from '../components/HomeComponents/LandingPage'
import Footer from '../components/Footer'

const Home = ({ user }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

     
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="w-full mt-4">
          <LandingPage />
        </div>
      </div>

     
      <Profile user={user} />

      <footer>
        <Footer />
      </footer>
    </div>
    
  )
}

export default Home