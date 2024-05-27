import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay, FreeMode,Pagination} from 'swiper/modules'
import Course_Card from './Course_Card'
const Course_Slider = ({courses}) => {
  
  
  return (
    <>
      {
        courses?.length ? (
          <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}       
          freeMode={true}
          autoplay={{
          delay: 2500,
          disableOnInteraction:false,
        }}
          modules={[FreeMode,Autoplay, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem] "
          >
            {
              courses?.map((course,i)=>(
                <SwiperSlide key={i}>

                <Course_Card course={course}  />
                </SwiperSlide>
              ))
            }
          </Swiper>
        ):(
          <p className="text-xl text-richblack-5">No Course Found</p>
        )
      }
    </>
  )
}

export default Course_Slider
