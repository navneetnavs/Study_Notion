import React from 'react'
import LoginForm from "./LoginForm";
import SignupForm from './SignupForm';
import { useSelector } from 'react-redux';
import frameImg from '../../../assets/Images/frame.png';
const Template = ({title,description1,description2,image,formType}) => {
  const {loading}=useSelector((state)=>state.auth);
  return (
    <div className='bg-richblack-900 min-h-[calc(100vh-3.5rem)] '>
      {
        loading ? (<div>loading...</div>):(
          <div className='flex w-11/12 mx-auto  flex-col-reverse    max-w-maxContent justify-between mt-16 gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 items-center md:items-start '>
          <div className='max-w-[450px] mx-auto w-11/12 md:mx-0'>
       <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>{title}</h1>
         <div className='mt-4 text-[1.125rem] leading-[1.625rem] '>
          <p className='text-richblack-100'>{description1}</p>
          <p className="font-edu-sa text-[1rem] font-semibold italic text-blue-100">{description2}</p>
         </div>
         {formType ==="signup" ? (<SignupForm/>):(<LoginForm/>)}
          </div>
          <div className='max-w-[450px] mx-auto w-11/12 md:mx-0 relative'>
           <img src={frameImg}  alt="pattern" width={558}
              height={504}
              loading="lazy" />
           <img src={image} alt="student" width={558}
              height={504} className='absolute -top-4 right-4'
              loading="lazy" />
          </div>
        </div>)
      }
    </div>
  )
}

export default Template
