import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
const Card = ({cardData,currentCard,setCurrentCard}) => {
  return (
    <div className={`flex flex-col  w-[300px] ${currentCard===cardData?.heading ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50":"bg-richblack-800"
    }  h-[300px]  box-border`}
    onClick={()=>setCurrentCard(cardData.heading)}>
     <div className='p-6 border-b-[2px] border-richblack-400 border-dashed h-[80%] flex flex-col gap-3' >
      <p className={`text-[20px] ${currentCard===cardData?.heading? "text-black":"text-white"} font-semibold`}>
      {cardData.heading}
      </p>
      <p className='text-richblack-400'>
       {cardData.description }
      </p>
     </div>
     <div className={`flex justify-between ${currentCard===cardData?.heading? "text-richblack-300":"text-blue-300"} px-6 py-3 font-medium `}>
       <div className='flex gap-2 items-center'>
       <HiUsers/>
       {cardData.level}
       </div>
       <div className='flex gap-2 items-center'>
       <ImTree/>
       {cardData.lessionNumber} Lession
       </div>
     </div>
    </div>
  )
}

export default Card
