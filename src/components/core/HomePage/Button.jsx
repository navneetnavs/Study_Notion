import React from 'react'
import { Link } from 'react-router-dom'
const Button = ({children,active ,linkto}) => {
  return (
   <Link to={linkto}>

    <div className={`py-[12px] text-[12px] lg:text-[16px]  rounded-[8px] shadow-[-2px_-2px_0px_0px_rgba(255,255,255,0.51)_inset] px-[24px] ${active ? "bg-[#FFD60A] text-black":"bg-[#161D29]"} transition-all duration-200 hover:scale-95 hover:shadow-none `}>
      {children}
    </div>
   </Link>
  )
}


export default Button
