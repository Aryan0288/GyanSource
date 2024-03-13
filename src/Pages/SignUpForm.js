import React from 'react'
import Template from '../Components/core/Auth/Template'
import family from '../assets/Images/signup.webp'
export default function SignUpForm({setIsLoggedIn}) {
    return (
            <Template
                title="Welcome Back"
                desc1="Build skill for today,tomorrow and beyond"
                desc2="Education to future proof your carrier"
                image={family}
                formtype="signup"
                setIsLoggedIn={setIsLoggedIn}
            />
    )
}
