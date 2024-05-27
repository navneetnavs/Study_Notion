import React from 'react'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { sendotp } from '../../../services/operations/authApi';
import { setSignupData } from '../../../slices/authSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import Tab from "../../common/Tab"
const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", password: "", confirmPassword: "", email: ""
  })
  const { firstName, lastName, password, confirmPassword, email } = formData;
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR
    }
  ]
  function handleOnSubmit(e) {
    e.preventDefault();
    if(password!==confirmPassword){
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData={
      ...formData,
      accountType
    };
     // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
  //  send otp to user verification
    dispatch(sendotp(email,navigate));
    // reset
    setFormData({
      firstName:"" , lastName:"", password:"",confirmPassword:"",email:""
    })
    setAccountType(ACCOUNT_TYPE.STUDENT);
  }
  function handleOnChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <div className='max-h-maxContent'>
      <Tab tabData={tabData} accountType={accountType} setAccountType={setAccountType} />
      <form onSubmit={handleOnSubmit} className='flex w-full flex-col gap-y-4' >

        <div className='flex gap-4'>
          <label htmlFor="">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name <sup className='text-pink-200'>*</sup>   </p>
            <input  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" required type="text" name='firstName' value={firstName} onChange={handleOnChange} placeholder='Enter first name' />
          </label>
          <label htmlFor="">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name <sup className='text-pink-200'>*</sup>   </p>
            <input  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" required type="text" name='lastName' value={lastName} onChange={handleOnChange} placeholder='Enter last name' />
          </label>
        </div>
        <label htmlFor="">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address  <sup className='text-pink-200'>*</sup>     </p>
          <input  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" required type="email" name="email" value={email} onChange={handleOnChange} placeholder='Enter email address' />
        </label>
        <div className='flex gap-4'>
          <label htmlFor="" className='relative'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Create Password  <sup className='text-pink-200'>*</sup>  </p>
            <input  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" required type={showPassword ? "text" : "password"} name='password' value={password} onChange={handleOnChange} placeholder='Enter password' />
            <span className="absolute right-3 top-[38px] z-[10] cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
            </span>
          </label>
          <label htmlFor="" className='relative'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password  <sup className='text-pink-200'>*</sup>  </p>
            <input  style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5" required type={showConfirmPassword ? "text" : "password"} name='confirmPassword' value={confirmPassword} onChange={handleOnChange} placeholder='Confirm password' />
            <span className="absolute right-3 top-[38px] z-[10] cursor-pointer" onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
            </span>
          </label>
        </div>
        <button type='submit'  className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
          Create Account
        </button>
      </form>

    </div>
  )
}

export default SignupForm
