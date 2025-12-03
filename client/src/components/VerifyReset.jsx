import React, { useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import API from '../api/apiCheck'

export default function VerifyReset() {
  const location = useLocation()
  const navigate=useNavigate()
  console.log(location.state)
  const email = location.state
  const [otp, setOtp] = useState("")
  const [otpVerified, setOtpVerified] = useState(false)

  const [newPassword, setNewPassword] = useState("")
  const [passwordUpdated, setPasswordUpdated] = useState(false)

  async function handleVerifyOtp() {
    await API.post("/verify-otp", { email, otp })
      .then(res => {
        if (res.status === 200) {
          alert("OTP verified")
          setOtpVerified(true)
        }

      })
      .catch(err => {
        console.log(err)
      })
  }

  async function resetPassword() {
    try {
      await API.post("/reset-password", { email, password:newPassword })
      alert("Password Updated successfully")
      setPasswordUpdated(true)
      navigate("/login")
    }
    catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div>
      <h2>Verify otp & Reset password</h2>
      <input type="text" name="otp" placeholder='Enter OTP'
        onChange={(e) => setOtp(e.target.value)} />
      {
        !otpVerified && (
          <button onClick={handleVerifyOtp}>Verify</button>
        )
      }

      {/* password input enabling after otp gets verified */}
      {
        otpVerified && !passwordUpdated && (
          <>
            <input 
              type="password" 
              placeholder='Enter new password' 
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}/>
            <button onClick={resetPassword}>Update password</button>
          </>
        )
      }

    </div>
  )
}
