import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({children}) {
    console.log("from protected route",children)
    const token = localStorage.getItem("token")
  
    if(!token)
        return <Navigate to="/login" replace/>
    return children
}
