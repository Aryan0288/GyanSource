import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, Navigate, useNavigate } from 'react-router-dom';

// export default function Login({ setIsLoggedIn }) {
export default function Login({  }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [pass, setpass] = useState(false);

    function ChangeHandler(event) {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value

        }))
    }

    const Navigate = useNavigate();
    function submitHandler(event) {
        event.preventDefault();
        // setIsLoggedIn(true);
        toast.success("LoggedIn Successfully");
        console.log(formData);
        Navigate("/DashBoard");
    }

    return (
        <div className=''>
            <form className='flex flex-col w-full gap-8 text-white' onSubmit={submitHandler}>
                <div className='flex flex-col gap-3'>


                    <label className='w-full '>
                        <p className='text-[17px] mb-1'>Email Address <sup className='text-red-500'>*</sup></p>
                        <input name='email' className='active:border-none focus:outline-none  p-2 rounded-md border-b-2 border-b-slate-700 outline-[0.5px] w-full bg-richblack-800' required type='email' value={formData.email} onChange={ChangeHandler} placeholder='Enter email id' />
                    </label>

                    <label className='relative w-full'>
                        <p className='text-[17px] mb-1'>Password <sup className='text-red-600'>*</sup></p>
                        <input
                            className='active:border-none focus:outline-none p-2 rounded-md border-b-2 border-b-slate-700 outline-[0.5px] w-full bg-richblack-800'
                            name='password'
                            required
                            type={pass ? ('text') : ('password')}
                            value={formData.password}
                            onChange={ChangeHandler}
                            placeholder='Enter Password'
                        />

                        <span className='absolute right-2 text-[22px] top-9 cursor-pointer' onClick={() =>
                            setpass((prev) => !prev)
                        }>
                            {pass ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
                        </span>

                        <Link to="#">
                            <p className='text-right font-medium text-blue-200 text-[14px] hover:text-blue-300'>Forgot Password</p>
                        </Link>
                    </label>
                </div>

                <button className='w-full py-2 rounded-md text-black bg-yellow-400 font-semibold'>
                    Sign In
                </button>
            </form>
        </div>
    )
}
