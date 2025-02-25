import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendar,
  FaCog,
  FaMoneyCheck,
  FaTachometerAlt,
  FaUsers,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 bg-teal-600 text-white p-2 rounded z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

    
      <div
        className={`bg-gray-800 text-white h-screen fixed top-0 left-0 w-64 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block z-50`}
      >
   
        <div className="bg-teal-600 h-12 flex items-center justify-center">
          <h3 className="text-2xl text-center font-semibold">Employee MS</h3>
        </div>

    
        <div className="space-y-2 mt-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-300 hover:bg-teal-500 ${
                isActive ? "bg-teal-500" : ""
              }`
            }
            end
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="admin-dashboard/employees"
            className={({ isActive }) =>
              `flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-300 hover:bg-teal-500 ${
                isActive ? "bg-teal-500" : ""}`}
          >
            <FaUsers />
            <span>Employees</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/departments"
            className={({ isActive }) =>
              `flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-300 hover:bg-teal-500 ${
                isActive ? "bg-teal-500" : ""
              }`
            }
            end
          
          >
            <FaBuilding />
            <span>Departments</span>
          </NavLink>
          <NavLink
            to="/leaves"
            className="flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-300 hover:bg-teal-500"
          >
            <FaCalendar />
            <span>Leaves</span>
          </NavLink>
          <NavLink
            to="/salary"
            className="flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-300 hover:bg-teal-500"
          >
            <FaMoneyCheck />
            <span>Salary</span>
          </NavLink>
          <NavLink
            to="/settings"
            className="flex items-center space-x-4 block py-2.5 px-4 rounded transition duration-300 hover:bg-teal-500"
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>

      {/* Overlay When Sidebar is Open (Only for Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default AdminSidebar;
