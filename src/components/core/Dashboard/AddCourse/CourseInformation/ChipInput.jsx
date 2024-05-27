import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"

const ChipInput = ({
    label,
    register,
    name,
    placeholder,
    errors,
    setValue
}) => {


    const { editCourse, course } = useSelector((state) => state.course);
    const [chips, setChips] = useState([]);

    useEffect(() => {
        if (editCourse) {
            setChips(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
    }, [])
    useEffect(() => {
        setValue(name, chips);
    }, [chips])
     const handleKeyDown=(event)=>{
           if(event.key==="Enter"|| event.key===","){
            event.preventDefault();
            const chipValue=event.target.value.trim();
            if(chipValue && !chips.includes(chipValue)){
                const newChip=[...chips,chipValue]
                setChips(newChip);
                event.target.value=""
            }
           }
     }
       
      
    const handleDeleteChip=(chipIndex)=>{
        const newChips = chips.filter((_,index) => index !== chipIndex)
        setChips(newChips)
    }
    return (
        <div className='flex flex-col space-y-2'>
        {/* render the label for the input */}
           <label className='lable-style' htmlFor={name}>
            {label} <sup className='text-pink-200'>*</sup>
           </label>
           {/* Render the chips and input */}
           <div className="flex w-full flex-wrap gap-y-2">
              {/* Map over the chip array and render each chip */}
              {
                chips.map((chip,index)=>(
                    <div key={index}  className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                    {chip}
                    <button type='button' onClick={()=>handleDeleteChip(index)} className="ml-2 focus:outline-none">
                     <MdClose className='text-sm'/>
                    </button>
                    </div>
                ))
              }
                      {/* Render the input for adding new chips */}
               <input type="text" placeholder={placeholder} id={name}
               name={name} className='form-style w-full' onKeyDown={handleKeyDown} />
           </div>
           
      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
        </div>
    )
}

export default ChipInput 
