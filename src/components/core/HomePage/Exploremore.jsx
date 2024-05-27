import React, { useState } from 'react';

import Highlight from './Highlight';
import { HomePageExplore } from '../../../data/homepage-explore';
import  Card from './Card';


const Exploremore = () => {
  const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"

  ]
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses ,setCourses]=useState(HomePageExplore[0].courses);
  const [currentCard,setCurrentCard]= useState(HomePageExplore[0].courses[0].heading);

  const setMyCard = (value) => {
    setCurrentTab(value);
    const card=HomePageExplore.filter((course)=> course.tag===value);
    setCourses(card[0].courses);
    setCurrentCard(card[0].courses[0].heading);
  }
  return (
    <div>
      <div>
        <div className='text-4xl font-semibold mt-10 text-center'>
          Unlock the
          <Highlight text={" Power of Code "} />
        </div>
        <div className='text-center text-richblack-300 font-semibold text-lg mt-1'>
          Learn to Build Anything You Can Imagine
        </div>
      </div>
      {/* buttonTab */}
      <div className='hidden   lg:flex w-fit mx-auto gap-5 mt-6 bg-richblack-800 text-richblack-200 rounded-full p-1'>
        {
          tabsName.map((element, index) => (
            <div className={`text-[16px] px-7 cursor-pointer py-[7px] font-medium rounded-full transition-all duration-200 hover:bg-richblack-900 ${currentTab === element ? "bg-richblack-900 font-medium text-richblack-5" : "text-richblack-200"} hover:text-richblack-5  `} key={index} onClick={() => setMyCard(element)}>
              {element}
            </div>
          )
          )
        }
      </div>
      {/* cards tab */}
      <div className='flex sm:items-center sm:justify-center    mt-14 lg:justify-between  gap-10 lg:p-4 lg:flex-row pb-40 lg:pb-0 flex-col'>
        {
          courses.map((course,index)=>(
            <div className='cursor-pointer ' key={index}>
            <Card cardData={course} key={index} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Exploremore
