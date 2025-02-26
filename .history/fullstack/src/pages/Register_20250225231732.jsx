import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", // Default role as 'employee'
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://employeesystem-zkpz.vercel.app/api/auth/register", JSON.stringify(register), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        navigate("/login"); 
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-300 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-pacific text-3xl text-slate-600">Employee Management System</h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">Role</label>
            <select
              name="role"
              className="w-full px-3 py-2 border"
              onChange={handleChange}
              value={register.role}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-teal-500 text-white py-2">Register</button>
          </div>
          <p>Have already Acoount <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
