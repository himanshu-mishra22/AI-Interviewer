import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router'
import {Toaster} from 'react-hot-toast'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/home/Dashboard'
import LandingPage from './pages/LandingPage'
import InterviewPrep from './pages/InterviewPrep/InterviewPrep'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/interview/:sessionId' element={<InterviewPrep/>} />
        </Routes>
      </BrowserRouter>

      <Toaster 
        toastOptions={{
          className:"",
          style:{
            fontSize:"13px",
          }
        }}
        />
    </div>
  )
}

export default App