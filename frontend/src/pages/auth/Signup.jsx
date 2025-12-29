import React from "react";
import useApi from "../../services/useApi";
import {useNavigate} from "react-router-dom"
import { useState } from "react";

function Signup() {
    const navigate=useNavigate()
    const{userName,setUserName}= useState("")
    const{email,setEmail}= useState("")
    const{password,setPassword}= useState("")





  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-200 to-green-400 flex justify-center items-center">
      
      <div className="w-[400px] bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Create Account 
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign up to start chatting
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              onChange={(e)=>(setUserName(e.target.value))}  
              type="text"
              placeholder="Enter your name"
              className="h-11 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Email</label>
            <input
                onChange={(e)=>(setEmail(e.target.value))}  
              type="email"
              placeholder="Enter your email"
              className="h-11 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Password</label>
            <input
                onChange={(e)=>(setPassword(e.target.value))}  
              type="password"
              value={password}
              placeholder="Create a password"
              className="h-11 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="h-11 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span  onClick={()=>navigate("/login")} className="text-green-600 font-medium cursor-pointer hover:underline">
            Login
          </span>
        </div>

      </div>
    </div>
  );
}

export default Signup;
