import axios from 'axios';
import React, { useState, useEffect } from 'react';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const TeacherControl = () => {
  const [actionType, setActionType] = useState('add');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('teacher');

  const [teachers, setTeachers] = useState([]);
  const [listLoading, setListLoading] = useState(true);

  
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  
  const showNotification = (text, type) => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage({ text: '', type: '' }); 
    }, 3000);
  };

 
  const fetchTeachersList = async () => {
    try {
      setListLoading(true);
      const response = await axios.get(`${backendUrl}/api/admin/get-teachers`, { withCredentials: true });

      if (response.data.success) {
     
        setTeachers(response.data.teachers || response.data.data || []);
      }
    } catch (error) {
    
      const errMsg = error.response?.data?.message || "Teachers load error";
      showNotification(errMsg, 'error');
    } finally {
      setListLoading(false);
    }
  };


  useEffect(() => {
    fetchTeachersList();
  }, []);

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (actionType === 'add') {
      try {
        const response = await axios.post(
          `${backendUrl}/api/admin/add-teacher`,
          { email, role },
          { withCredentials: true }
        );

        if (response.data.success) {
          
          showNotification(response.data.message || "Teacher successfully added! ", 'success');

          
          setEmail('');
          setRole('teacher');
          fetchTeachersList(); 
        }
      } catch (error) {
        
        const errMsg = error.response?.data?.message || "Erro for add teacher";
        showNotification(errMsg, 'error');
        console.error(error);
      }
    } else {
    
      try {
        const response = await axios.post(
          `${backendUrl}/api/admin/delete-teacher`,
          { email },
          { withCredentials: true }
        );

        if (response.data.success) {
          
          showNotification(response.data.message || "Teacher demoted to student! ", 'success');
          setEmail('');
          fetchTeachersList(); 
        }
      } catch (error) {
    
        const errMsg = error.response?.data?.message || "Remove error";
        showNotification(errMsg, 'error');
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto p-4 relative">

  
      {statusMessage.text && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-2xl border font-bold text-sm transform transition-all duration-300 animate-bounce ${statusMessage.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}>
          {statusMessage.type === 'success' ? '✅ ' : '❌ '}
          {statusMessage.text}
        </div>
      )}

  
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 transition-all duration-300">
        <h2 className="text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
          <span>⚙️</span> Teacher Actions Management
        </h2>

      
        <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1.5 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => { setActionType('add'); setEmail(''); setRole('teacher'); }}
            className={`py-2.5 text-sm font-bold rounded-lg transition-all ${actionType === 'add'
              ? 'bg-white text-emerald-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
              }`}
          >
            ➕ Add Teacher
          </button>
          <button
            type="button"
            onClick={() => { setActionType('remove'); setEmail(''); }}
            className={`py-2.5 text-sm font-bold rounded-lg transition-all ${actionType === 'remove'
              ? 'bg-white text-rose-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
              }`}
          >
            ❌ Remove Teacher
          </button>
        </div>

        {/* Form Element */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input Field */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Teacher Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teacher@school.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-150"
              required
            />
          </div>

          {/* CONDITIONAL ROLE INPUT */}
          {actionType === 'add' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Assign Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-150 cursor-pointer"
              >
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-white text-sm shadow-md transition-all active:scale-[0.99] ${actionType === 'add'
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
              : 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'
              }`}
          >
            {actionType === 'add' ? 'Confirm: Assign Teacher Role' : 'Confirm: Demote to Student'}
          </button>
        </form>
      </div>

      {/* 👥 SECTION 2: TEACHERS LIST SHOWCASE */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
            <span>🧑‍🏫</span> Active Faculty Members
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Currently active teachers in your system database.
          </p>
        </div>

        
        {listLoading ? (
          <p className="text-center text-sm font-semibold text-gray-500">Teachers data loading, please wait...</p>
        ) : teachers.length === 0 ? (
          <p className="text-center text-sm font-semibold text-gray-400">No active teachers found in database.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teachers.map((teacher, index) => {
              
              const name = teacher.name || teacher.data?.name || "No Name";
              const email = teacher.email || teacher.data?.email || "No Email";
              const avatar = teacher.avatar || teacher.data?.avatar || null;
              const role = teacher.role || teacher.data?.role || "teacher";

              return (
                <div
                  key={teacher._id || teacher.id || index}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:shadow-sm transition-all duration-150"
                >
                
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 p-1 overflow-hidden shrink-0 flex items-center justify-center text-xl">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "🧑‍🏫"
                    )}
                  </div>

                 
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-800 truncate">
                      {name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate mb-1">
                      {email}
                    </p>
                
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 rounded-md capitalize">
                      {role}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default TeacherControl;