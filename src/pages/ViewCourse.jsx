import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsApi'
import { setCourseSectionData, setEntireCourseData, setCompletedLectures, setTotalNoOfLectures } from "../slices/viewCourseSlice"
const ViewCourse = () => {
  const { courseId } = useParams()
  console.log('courseId..', courseId);

  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  useEffect(() => {
    ; (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData))
      dispatch(setCompletedLectures(courseData.completedVideos))
      console.log('7');

      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
      console.log('9');

    })
      ()
  }, [])
  return (
    <>

      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] mt-[2rem] flex-1 overflow-auto">
          <div className='mx-6'>
            <Outlet />
          </div>
        </div>
      </div>
      {
        reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
      }
    </>
  )
}

export default ViewCourse
