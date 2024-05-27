import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Highlight from '../components/core/HomePage/Highlight';
import CTAButton from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlock from '../components/core/HomePage/CodeBlock';
import Exploremore from '../components/core/HomePage/Exploremore';
import LauguageSection from '../components/core/HomePage/LauguageSection';
import SkillSection from '../components/core/HomePage/SkillSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';
const Home = () => {
  return (
    <div  >


      {/* section 1 */}
      <div className='bg-richblack-900 relative mx-auto w-11/12 max-w-maxContent flex flex-col justify-center items-center gap-8 pt-4'>


        <div className='flex  z-10 text-white max-w-maxContent items-center  flex-col  mt-10 w-11/12 mx-auto '>
          <Link to={"/signup"}>


            <div className='bg-richblack-800  text-[16px] leading-6 items-center gap-4 transition-all duration-200 hover:scale-95 w-fit  rounded-[500px] py-[10px] px-[22px] flex  text-richblack-200'>
              <p >Become an instructor</p>
              <FaArrowRight />
            </div>

          </Link>
          <div className='font-semibold text-white text-center text-4xl mt-7'>
            Empower Your Future with
            <Highlight text={" Coding Skills"} />

          </div>
          <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
          </div>
          <div className='flex gap-[16px] mt-7'>
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>
          </div>
          <div className='mx-3 shadow-[10px_-5px_50px_-5px]  shadow-blue-200 my-12 '>
            <video className='shadow-[20px_20px_rgb(255,255,255)]' muted loop autoPlay>
              <source src={Banner} type='video/mp4' />
            </video>
          </div>
          {/* code section-1 */}
          <div>
            <CodeBlock
              position={"lg:flex-row"}
              heading={<div>
                Unlock your
                <Highlight text={" coding potential "} />
                with our online courses.
              </div>}
              subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
              ctabtn1={{
                linkto: "/signup",
                btntext: "Try it Yourself",
                active: true
              }}
              ctabtn2={{
                linkto: "/login",
                btntext: "Learn More",
                active: false
              }}
              codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<meta name="viewport"  />\n<title>This is my page</title>\n</head>\n<body>\n<h1>hello world</h1>\n</body>\n</html>`}
              codecolor={"text-yellow-25"} codeblockbg={`bg-yellow-25  opacity-[0.2]  blur-[34px] top-[-5px] rounded-full h-[257px] w-[373px] transform matrix-[1,0,-.03,1,0,0]`}
            />
          </div>
          {/* code section-2 */}
          <div>
            <CodeBlock
              position={"lg:flex-row-reverse"}
              heading={<div>
                Start
                <Highlight text={" coding in seconds "} />

              </div>}
              subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
              ctabtn1={{
                linkto: "/signup",
                btntext: "Continue Lesson",
                active: true
              }}
              ctabtn2={{
                linkto: "/login",
                btntext: "Learn More",
                active: false
              }}
              codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\n import { FaArrowRight } from "react-icons/fa"; \n 
const Home = () => { \nreturn ( \n<div>Home</div> \n) \n} \nexport default Home;`}
              codecolor={"text-white"} codeblockbg={`bg-gradient-to-br from-blue-500  via-cyan-400 to-green-200 blur-[34px] top-[-5px] rounded-full h-[257px] w-[373px] transform matrix-[1,0,-.03,1,0,0]`
}
            />
          </div>
          <Exploremore />
        </div>
      </div>
      {/* section 2 */}
      <div className='bg-pure-greys-5 relative    -top-32 text-richblack-700'>

        <div className='homepage_bg h-[320px]'>

          <div className='flex gap-7 lg:flex-row relative top-48  items-center justify-center' >
            <div className='bg-yellow-50 font-bold cursor-pointer rounded-md shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] text-[12px] lg:text-[16px] leading-6 items-center gap-2 transition-all duration-200 hover:scale-95 w-fit  py-[10px] px-[22px] flex  text-black'>
              <p>Explore More Catalog</p>
              <FaArrowRight />
            </div>
            <div className='bg-richblack-900 font-bold cursor-pointer rounded-md shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] lg:text-[16px] text-[12px] leading-6 items-center gap-2 transition-all duration-200 hover:shadow-none hover:scale-95 w-fit  py-[10px] px-[22px] flex  text-white' >
              <p>Learn More</p>
            </div>
          </div>
        </div>
        <LauguageSection />
        <div className='mb-8'>

          <SkillSection />
        </div>
      </div>
      {/* section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      {/* section 4 */}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
