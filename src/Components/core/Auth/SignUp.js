import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const SignUp = ({  }) => {
// const SignUp = ({ setIsLoggedIn }) => {

  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", 
    password: "",
    confirmPassword: ""
  })


  const [pass, setpass] = useState(false);
  const [pass1, setpass1] = useState(false);

  function changeHandler(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }


  let arr = [];
  function submitHandler(event) {
    event.preventDefault();
    if (formData.password != formData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    // setIsLoggedIn(true);
    toast.success("Account Createed!");
    const accountData = {
      ...formData
    }
    arr.unshift(formData);
    console.log("Printing account data");
    console.log(arr);
    Navigate("/DashBoard");

  }

  const [click, setclick] = useState(true);
  return (
    <div className='flex flex-col gap-5 w-full'>
      <div className='bg-richblack-800 rounded-full flex gap-2 max-w-max px-4 py-[5px] transition-all duration-150'>
        <button className={click ? ('px-6 bg-[#000814] py-2 rounded-full') : ('px-2 py-1 rounded-2xl')} onClick={() => setclick(true)}>Student</button>
        <button className={!click ? ('px-6 bg-[#000814] py-2 rounded-full') : ('px-2 py-1 rounded-2xl')} onClick={() => setclick(false)}>Instructor</button>
      </div>

      <form onSubmit={submitHandler} className='flex flex-col gap-5 w-full'>
        <div className='flex gap-4'>
          <label className='w-full '>
            <p>First Name<sup className='text-red-500 text-[14px] font-bold'>*</sup></p>
            <input
              className='active:border-none focus:outline-none  p-2 rounded-md border-b-2 border-b-slate-700 outline-[0.5px] w-full bg-slate-700/90 text-white bg-richblack-800 active:outline-none'
              required
              type='text'
              name='firstName'
              onChange={changeHandler}
              placeholder='Enter Your First Name'
              value={formData.firstName}
            />
          </label>

          <label className='w-full'>

            <p>Last Name</p>
            <input
              className='active:border-none focus:outline-none p-2 rounded-md border-b-2 border-b-slate-700 outline-[0.5px] w-full bg-slate-700/90 text-white bg-richblack-800'
              required
              type='text'
              name='lastName'
              onChange={changeHandler}
              placeholder='Enter Your Last Name'
              value={formData.lastName}
            />
          </label>
        </div>

        <label className='w-full'>
          <p>Email Address <sup className='text-red-500 text-[14px] font-bold'>*</sup></p>
          <input
            className='active:border-none focus:outline-none p-2 rounded-md border-b-2 border-b-slate-700 outline-[0.5px] w-full bg-slate-700/90 text-white bg-richblack-800'
            required
            type='email'
            name='email'
            onChange={changeHandler}
            placeholder='Enter Your Email Address'
            value={formData.email}
          />
        </label>

        <div className='flex gap-4'>
          <label className='w-full relative'>
            <p>Create Password <sup className='text-red-500 text-[14px] font-bold'>*</sup></p>
            <input
              className='active:border-none focus:outline-none p-2 rounded-md border-b-2 border-b-slate-700 outline-[0.5px] w-full bg-slate-700/90 text-white bg-richblack-800'
              type={pass ? ('text') : ('password')}
              name='password'
              value={formData.password}
              placeholder='Enter Your Password'
              required
              onChange={changeHandler}
            />
            <span className='absolute right-2 text-[22px] top-9 cursor-pointer'
              onClick={() => setpass((prev) => !prev)}>
              {pass ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
            </span>
          </label>

          <label className='w-full relative'>
            <p>Confirm Password <sup className='text-red-500 text-[14px] font-bold'>*</sup></p>
            <input
              className='active:border-none focus:outline-none p-2 rounded-md border-b-2 border-b-slate-700 outline-[0.5px] w-full bg-slate-700/90 text-white bg-richblack-800'
              type={pass1 ? ('text') : ('password')}
              name='confirmPassword'
              value={formData.confirmPassword}
              placeholder='Enter Your Password'
              required
              onChange={changeHandler}
            />
            <span className='absolute right-2 text-[22px] top-9 cursor-pointer'
              onClick={() => setpass1((prev) => !prev)}>
              {pass1 ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
            </span>
          </label>
        </div>

        <div className='mt-6'>
          <button className='w-full py-2 rounded-md text-black bg-yellow-400 font-semibold'>
            Create Account
          </button>
        </div>


      </form>
    </div>
  )
}
export default SignUp