import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
const RequirementsField = ({
  name,
  label,
  register,
  setValue,
  errors
}) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])
  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [])

  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList])
  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement("")
    }
  }
  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList];
    updatedRequirements.splice(index, 1);
    setRequirementsList(updatedRequirements);
  }
  return (
    <div className='flex flex-col space-y-2'>
      <label className='lable-style' htmlFor={name}>
        {label} <sup className='text-pink-200'>*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input id={name} type='text' value={requirement} onChange={(e) => setRequirement(e.target.value)} className="form-style w-full" />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {
        requirementsList.length > 0 && (
          <ul>
            {
              requirementsList.map((ele, i) => (
                <li key={i} className="flex items-center text-richblack-5">
                  <span>{ele}</span>
                  <button type='button' className="ml-2 text-xs text-pure-greys-300 "
                    onClick={() => handleRemoveRequirement(i)}>
                    clear
                  </button>
                </li>
              ))
            }
          </ul>
        )
      }
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

export default RequirementsField
