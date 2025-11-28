import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Register() {
    const navigate= useNavigate()
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        mobile:"",
        gender:"",
        address:""
    })

    function handleSubmit(e){
        e.preventDefault()
        console.log(formData)
        if(formData.password=== formData.confirmPassword){
             axios.post(`${import.meta.env.VITE_API_URL}/api/register`,formData)
            .then((res)=>{
                if(res.status===201){
                    alert("Registration successful")
                    navigate("/login")
                }
            })
        }
        else {
            alert("Password mismatch")
        }
       
    }

    function handleChange(e){
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-field'>
                <input 
                    type="text" 
                    name="name"
                    placeholder='Enter name'
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
             <div className='form-field'>
                <input 
                    type="email" 
                    name="email"
                    placeholder='Enter email'
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
             <div className='form-field'>
                <input 
                    type="password" 
                    name="password"
                    placeholder='Enter password'
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div className='form-field'>
                <input 
                    type="password" 
                    name="confirmPassword"
                    placeholder='Enter confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </div>
             <div className='form-field'>
                <input 
                    type="text" 
                    name="address"
                    placeholder='Enter address'
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>
             
             <div className='form-field'>
                <input 
                    type="text" 
                    name="mobile"
                    placeholder='Enter mobile'
                    value={formData.mobile}
                    onChange={handleChange}
                />
            </div>
            <div className='form-field'>
                <input 
                    type="radio" 
                    name="gender"
                    value="Male"
                    checked={formData.gender==="Male"}
                    onChange={handleChange}
                /> Male
                <input 
                    type="radio" 
                    name="gender" 
                    value="Female" 
                    checked={formData.gender==="Female"}
                    onChange={handleChange} /> Female
            </div>
            <button>Submit</button>
        </form>
    )
}
