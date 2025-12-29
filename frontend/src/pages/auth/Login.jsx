import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";

function Login() {
  const navigate=useNavigate()
  const  {post,loading,error}= useApi()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")





  //handle Submit
async  function handleSubmit(e) {
    e.preventDefault()

    try{
      const data=await post("chat/api/login",{
        email,
        password
      })
      localStorage.setItem("token",data.token)
      navigate("/chat")
    }catch(e)
    {
        console.log(e)
    }
  }























  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-200 to-green-400 flex justify-center items-center">

      <div className="w-[400px] bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to continue chatting
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="h-11 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="h-11 px-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>

          {/* Forgot password */}
          <div className="text-right text-sm">
            <span className="text-green-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!email || !password}
            className={`h-11 rounded-lg font-semibold transition ${email && password? "bg-green-500 text-white hover:bg-green-600": "bg-green-300 text-white cursor-not-allowed"}`}
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          New here?{" "}
          <span onClick={()=>navigate("/signUp")} className="text-green-600 font-medium cursor-pointer hover:underline">
            Create an account
          </span>
        </div>

      </div>
    </div>
  );
}

export default Login;
