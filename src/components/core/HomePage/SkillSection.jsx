import React from 'react'
import Highlight from './Highlight'
import CTAButton from "./Button"
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_other from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
const SkillSection = () => {
  return (
    <div className='w-11/12  max-w-maxContent mx-auto'>
      <div className="text-4xl font-semibold text-center my-10">
            Your swiss knife for
            <Highlight text={"learning any language"} />
            <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
              <img
                src={know_your_progress}
                alt=""
                className="object-contain  lg:-mr-32 "
              />
              <img
                src={compare_with_other}
                alt=""
                className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
              />
              <img
                src={plan_your_lesson}
                alt=""
                className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
              />
            </div>
          </div>

          <div className="w-fit mx-auto  lg:mb-20 pb-10 -mt-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="">Learn More</div>
            </CTAButton>
          </div>
    </div>
  )
}

export default SkillSection
