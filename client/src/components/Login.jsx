import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate()
    const { loginUser } = useContext(AuthContext)
    const [loginData, setLoginData] = useState({
        email: "", password: ""
    })

    function handleLogin(e) {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_URL}/api/login`, loginData, { withCredentials: true })
            .then(res => {
                console.log(res)
                alert(res.data.message)
                //store the token in frontend
                // localStorage.setItem("token", res.data.token)
                loginUser(res.data)
            })
            .catch((err) => {
                console.log(err)
                alert(err.response.data.message)
            })
    }

    function handleChange(e) {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className='form-field'>
                    <input
                        type="email"
                        name="email"
                        placeholder='Enter email'
                        value={loginData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-field'>
                    <input
                        type="password"
                        name="password"
                        placeholder='Enter password'
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </div>
                <button>Login</button>
            </form>
            <Link to="/forgot-password">Forget Password</Link>
        </div>

    )
}



