import React, { useEffect, useState } from 'react';
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Footer from '../components/common/Footer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import CourseAccordinBar from '../components/core/Course/CourseAccordinBar';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { fetchCourseDetails } from '../services/operations/courseDetailsApi';
import { formatDate } from '../services/formatDate';
import GetAvgRating from '../utils/avgRating';
import Error from './Error';
import { BuyCourse } from '../services/operations/studentFeaturesApi';
import { toast } from 'react-hot-toast'
import { ACCOUNT_TYPE } from '../utils/constants';
import { addToCart } from '../slices/cartSlice';

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [response, setResponse] = useState(null)
  const [confirmationalModal, setConfirmationalModal] = useState(null)
  useEffect(() => {
    ; (async () => {
      try {
        

        const res = await fetchCourseDetails(courseId)
       

        setResponse(res)

      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.reviewAndRating)
    setAvgReviewCount(count)
  }, [response])
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e !== id)
    )
  }
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])
  const handleAddToCart=()=>{
    if(user && user?.accountType===ACCOUNT_TYPE.INSTRUCTOR ){
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if(token){
      dispatch(addToCart(response?.data?.courseDetails))
      return
    }
    
  }
  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <Error />
  }
  const {
   
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatWillYouLearn,
    courseContent,
    reviewAndRating,
    instructor,
    studentsEnrolled,
    createdAt
  } = response.data?.courseDetails
  console.log('response.data?.courseDetails', response.data?.courseDetails);
  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationalModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationalModal(null)
    })
  }
  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  return (
    <>
    <div className={`relative w-full bg-richblack-800`}>
      {/* hero section */}
      <div className="mx-auto box-content px-4  2xl:relative ">
        <div  className="mx-auto  min-h-[450px] max-w-maxContentTab   py-8   lg:py-0 xl:max-w-[810px]">
          <div className="relative block h-[100%]  lg:hidden">
          {/* <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div> */}
          <img src={thumbnail} alt="course thumbnail" className='aspect-auto h-[50%] rounded-md ' />
          </div>
          <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
             <div>
             <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
             </div>
             <p className={`text-richblack-200`}>{courseDescription}</p>
             <div className="text-md flex flex-wrap items-center gap-2">
             <span className="text-yellow-25">{avgReviewCount}</span>
             <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
             <span>{`(${reviewAndRating.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
             </div>
             <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className='flex flex-wrap gap-5 text-lg'>
               <p className='flex items-center gap-2'>
                <BiInfoCircle/>
                <span>
                  Created at {formatDate(createdAt)}
                </span>
               </p>
               <p className='flex items-center gap-2'>
                <HiOutlineGlobeAlt/> English
               </p>
              </div>
          </div>
          <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
          <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button
              className="yellowButton"
              onClick={
                user && response?.data?.courseDetails?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && response?.data?.courseDetails?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !response?.data?.courseDetails?.studentsEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="blackButton">
                Add to Cart
              </button>
            )}
          </div>
        </div>
        {/* courses card */}
        <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
          <CourseDetailsCard course={response?.data?.courseDetails} setConfirmationalModal={setConfirmationalModal} handleBuyCourse={handleBuyCourse} />
        </div>
      </div>
    </div>
    <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatWillYouLearn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{response.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordinBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <Footer/>
     {
      confirmationalModal &&  <ConfirmationModal modalData={confirmationalModal} />
     }

    </>
  )
}

export default CourseDetails