
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authApi';
const LoginForm = () => {
  const [showPassword,setShowPassword]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    email:"",
    password:""
  });
  const {email,password}=formData;
  function handleOnChange(e){
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value
    }))
  }
  function handleOnSubmit(e){
    e.preventDefault();
    dispatch(login(email,password,navigate));
  }
  return (
    <div className='flex item-center mx-auto justify-center'>
      <form onSubmit={handleOnSubmit} className='mt-6 w-full flex flex-col gap-y-4'>
       <label htmlFor="" className='w-full'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address  <sup className='text-pink-200'>*</sup>  </p>
        <input  style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" required type="email" name='email' value={email} onChange={handleOnChange} placeholder='Enter email address' />
       </label>
       <label htmlFor="" className='relative'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Password <sup className='text-pink-200'>*</sup> </p>
        <input  style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" required type={showPassword? "text":"password"} name='password' value={password} onChange={handleOnChange} placeholder='Enter password' />
        <span className="absolute right-3 top-[38px] z-[10] cursor-pointer" onClick={()=>setShowPassword((prev)=>!prev)}>
          {
            showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
          }
        </span>
        <Link to={"/forgotPassword"}>
           <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">Forgot Password</p>
        </Link>
       </label>
       <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
       >
        Sign In
       </button>
      </form>
    </div>
  )
}

export default LoginForm
