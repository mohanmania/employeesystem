import axios from "axios";
import React, { useContext, useState } from "react";
import { useAuth } from "../context/authContext";
import {Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {login} = useAuth()

  const SubmitForm = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://employeesystem-zkpz.vercel.app/api/auth/login",
        { email, password }
      );
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token",response.data.token)
        if(response.data.user.role === "admin"){
          navigate("/admin-dashboard")
        }

          

      }
    
    } catch (error) {
      console.log(error);
      if(error.response && !error.response.data.success){
        setError(error.response.data.error)
      }
      else{
        setError("server error")
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-300 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-pacific text-3xl text-slate-600">
        Employee Management System
      </h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={SubmitForm}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="enter your emial"
              className="w-full px-3 py-2 border"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="enter your password"
              className="w-full px-3 py-2 border"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">
              Forgot password
            </a>
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-red-300 text-white py-2">
              Login
            </button>
          </div>
          <p>you alreeaay an Account?<Link to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
