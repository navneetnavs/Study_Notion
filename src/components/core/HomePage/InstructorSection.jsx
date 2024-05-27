import React from 'react'
import instructureImage from "../../../assets/Images/Instructor.png";
import Highlight from './Highlight';
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className='flex flex-col lg:flex-row w-11/12 justify-between gap-20 max-w-maxContent mx-auto '>
      <div className='lg:w-[50%] mt-20 '>
        <img src={instructureImage} alt="instructor" className='shadow-white shadow-[-20px_-20px_0_0]' />
      </div>
      <div className='lg:mt-40 mt-20 lg:-w-[50%] flex flex-col gap-10 '>
        <div className='font-semibold text-4xl text-white'>Become an  <br /><Highlight text={"instructor"}/>
         </div>
         <p className='font-semibold text-[16px] w-[85%] text-richblack-300 '>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
         
           <div className='flex w-fit flex-row'>

          <CTAButton active={true} linkto={'/signup'}>
            <div className='flex items-center gap-2 font-bold'>

            <p>Start Teaching Today</p>
           <FaArrowRight/>
            </div>
           
          </CTAButton>
           </div>
        
      </div>
    </div>
  )
}

export default InstructorSection
