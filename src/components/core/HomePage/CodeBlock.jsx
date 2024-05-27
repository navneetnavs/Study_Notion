import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { FaArrowRight } from "react-icons/fa";
import CTAButton from '../HomePage/Button'

const CodeBlock = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, codecolor,codeblockbg }) => {
    return (
        <div className={`flex ${position} my-20  justify-between flex-col lg:gap-10 gap-10`}>
        {/* about */}
            <div className='lg:w-[50%] w-[100%] flex flex-col gap-4'>

                <div className='text-4xl font-semibold'>
                    {heading}
                </div>
                <div className='text-[16px] leading-6 text-richblack-200'>
                    {subheading}
                </div>
                <div className='flex gap-4  items-center mt-12'>
               <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
               <div className='flex items-center gap-2'>
                {ctabtn1.btntext}
                <FaArrowRight/>
               </div>

               </CTAButton>
               <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} >
               
                {ctabtn2.btntext}
            
               </CTAButton>
                </div>
            </div>
           {/* codebox */}
            <div className='h-fit flex  gap-2 pt-4 relative pb-4 code-border lg:w-[500px]'>
            {/* line count */}
             <div className='flex flex-col select-none text-center w-[10%] text-richblack-400 font-inter font-bold'>
             <p>1</p>
             <p>2</p>
             <p>3</p>
             <p>4</p>
             <p>5</p>
             <p>6</p>
             <p>7</p>
             <p>8</p>
             <p>9</p>
             <p>10</p>
             <p>11</p>
             </div>
             <div className={`${codeblockbg} absolute`}></div>
             {/* code section */}
             <div className={`w-[90%] ${codecolor} flex flex-col relative font-bold font-mono gap-2 pr-1 `}>
              <TypeAnimation sequence={[codeblock,2000,""]}
              repeat={Infinity}
              cursor={true}
              style={{
                whiteSpace:"pre-line",
                display:"block",
                fontSize:"14px"
              }}
              omitDeletionAnimation={true}
              />
        

             </div>
            </div>
        </div>
    )
}

export default CodeBlock






