import React from 'react'
import Template from '../Components/core/Auth/Template'
import family from '../assets/Images/login.webp'
export default function LoginForm({setIsLoggedIn}) {
  return (
   <Template
        title="Welcome Back"
        desc1="Build skill for today,tomorrow and beyond"
        desc2="Education to future proof your carrier"
        image={family}
        formtype="login"
        setIsLoggedIn={setIsLoggedIn} 
   /> 
  )
}
