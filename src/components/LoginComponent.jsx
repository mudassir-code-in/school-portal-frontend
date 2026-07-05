import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const LoginComponent = () => {

  const navigate = useNavigate();

  const responseGoogle = async (authResponse) => {
    try {

      const response = await axios.post(`${backendUrl}/api/auth/login`, {
          code: authResponse.code
        }, {
          withCredentials: true 
        });


        window.location.reload();
      
      
    } catch (error) {
      console.log('error', error);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  })

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-white overflow-hidden">

      <div className="w-full md:w-1/2 h-2/5 md:h-full relative bg-slate-900">
        <img
          className="w-full h-full object-cover opacity-80"
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"
          alt="Ideal High School Campus"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 via-slate-900/30 to-transparent flex flex-col justify-end p-8 md:p-16 text-white">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Ideal High School
          </h1>
          <p className="text-slate-200 text-sm md:text-base max-w-md font-light leading-relaxed">
            Where education meets excellence, innovation, and global leadership.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-3/5 md:h-full bg-white flex flex-col justify-between items-center p-8 sm:p-12 md:py-20 md:px-24">

        <div className="hidden md:block"></div>

        <div className="w-full max-w-sm flex flex-col items-center my-auto">

          <div className="mb-3">
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
              Management Portal
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3 text-center">
            Account Sign In
          </h2>

          <p className="text-slate-500 text-sm text-center mb-10 max-w-xs leading-relaxed">
            Please verify your identity using your institutional Google account to access the dashboard.
          </p>

          <button
            onClick={googleLogin}
            className='shadow-2xl cursor-pointer px-6 py-3 rounded-xl text-xl flex items-center justify-center gap-3 bg-white border border-slate-200 hover:scale-102 hover:shadow-xl transition-all duration-200 active:scale-98 text-slate-700 font-medium w-full max-w-xs'
          >
            <img className='h-8' src='/google.logo.png' alt="google logo" />
            Continue with google
          </button>

        </div>

        <div className="flex flex-col items-center mt-8">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
            Engineered By
          </p>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-semibold text-slate-800 tracking-wide">
              Mudassir
            </span>
            <span className="text-xs text-slate-400 font-medium bg-white px-2 py-0.5 rounded-md border border-slate-100">
              Full Stack Engineer
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default LoginComponent