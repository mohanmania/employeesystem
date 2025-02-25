import React from 'react'
import { useAuth } from '../context/authContext'
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import AdminSummary from '../components/dashboard/AdminSummary';
function AdminDashboard() {
  const {user} = useAuth();
  const navigate = useNavigate()
 
  return (
    <div className='flex'>
    <AdminSidebar/>
      <div className='flex-1 ml-0 lg:ml-64 bg-gray-100 h-screen'>
        <Navbar/>
        {/* <AdminSummary/> */}
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
