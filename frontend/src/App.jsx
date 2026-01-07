import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Chat from "./pages/user/Chat"
import Profile from "./pages/Profile"
import './App.css'

import Protected_Route from "./components/Protected_Route"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/chat" element={
            <Protected_Route>
              <Chat />
            </Protected_Route>
          }></Route>
          <Route path="/profile" element={
            <Protected_Route>
              <Profile />
            </Protected_Route>
          }></Route>

        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
