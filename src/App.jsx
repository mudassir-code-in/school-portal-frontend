import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

import Login from './pages/login';
import Home from './pages/Home';

import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AddRemoveTeacher from './pages/AddRemoveTeacher';
import CreateResult from './pages/CreateResult';
import ViewResult from './pages/ViewResult';
import StudentPanel from './pages/StudentPanel';
import SubmitComplaint from './pages/SubmitComplaint';
import Complaints from './pages/Complaints';
import SubmitNotice from './pages/SubmitNotice';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.timeout = 5000;


axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (originalRequest.url && originalRequest.url.includes('/api/auth/refresh-token')) {
      
      return Promise.reject(error);
    }

    // CONDITION 2: Normal APIs ke liye retry logic
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
       
        const refreshResponse = await axios.get(`${backendUrl}/api/auth/refresh-token`, {
          withCredentials: true
        });

        if (refreshResponse.data && refreshResponse.data.success) {
          
          return axios(originalRequest);
        }
      } catch (refreshError) {
        
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
     
      const response = await axios.get(`${backendUrl}/api/auth/me`, {
        withCredentials: true
      });

      if (response.data && response.data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
   
      setUser(null);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <GoogleOAuthProvider clientId='54030074127-h34l529ekmugb6ta4d6pptltdhe65afp.apps.googleusercontent.com'>
              <Login />
            </GoogleOAuthProvider>
          )
        } />

        <Route path='/home' element={user ? <Home user={user} /> : <Navigate to="/" replace />} />
        <Route path='/student-panel' element={user ? <StudentPanel user={user}/> : <Navigate to='/' />} />

        {/* Role Protected Routes */}
        <Route path='/admin-dash' element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to='/home' />} />
        <Route path='/teacher-dash' element={user && (user.role === 'teacher' || user.role === 'admin') ? <TeacherDashboard /> : <Navigate to='/home' />} />
        <Route path='/admin/add-remove-teacher' element={user && user.role === 'admin' ? <AddRemoveTeacher /> : <Navigate to='/home' />} />
        <Route path='/create-result' element={user && (user.role === 'teacher' || user.role === 'admin') ? <CreateResult /> : <Navigate to='/home' />} />

        <Route path='/view-my-result' element={user ? <ViewResult /> : <Navigate to='/'/>} />

        <Route path='/submit-complaint' element={user ? <SubmitComplaint /> : <Navigate to='/' />}/>

        <Route path='/admin/complaints' element={user && user.role === 'admin' ? <Complaints /> : <Navigate to='/home'/>}/>

        <Route path='/admin/submit-notice' element={user && user.role === 'admin' ? <SubmitNotice user={user} /> : <Navigate to='/home' />} />


      </Routes>
    </div>
  );
};

export default App;