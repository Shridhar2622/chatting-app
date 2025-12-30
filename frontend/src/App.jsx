import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Chat from "./pages/user/Chat"
import './App.css'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<Login />} />
    <Route index element={<Signup />} />
    <Route path="/chat" element={<Chat />}></Route>

    </Routes>
    
    
    </BrowserRouter>
    </>
  )
}

export default App
