import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/apiCheck'

export default function ForgotPassword() {
    const [email,setEmail]=useState()
    const navigate= useNavigate()

    async function sendOtp(e){
        e.preventDefault()
        await API.post("/forgot-password", {email})
            .then(res=>{
                alert("OTP sent successfully to respective email")
                navigate("/verify-reset", {state:email})
            })
            .catch(err=>{
                console.log("Error from send otp function",err)
            })
    }

    return (
        <div>
            <form onSubmit={sendOtp}>
                <input 
                    type="text" 
                    placeholder='Enter email' 
                    name="email"
                    onChange={(e)=>setEmail(e.target.value)}/>
                <button>Send OTP</button>
            </form>
        </div>
    )
}
