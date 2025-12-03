import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPassword from './components/ForgotPassword'
import VerifyReset from './components/VerifyReset'
export default function App() {
  return (
    <div>
      
      <Navbar/>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/verify-reset' element={<VerifyReset/>}/>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
            }/>
        </Routes>
    </div>
  )
}
