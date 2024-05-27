import React from 'react'


const Highlight = ({text}) => {
  return (
    <span  className='font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]
    text-transparent bg-clip-text w-fit'>
      {text}
    </span>
  )
}

export default Highlight
