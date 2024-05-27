import React, { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseCategories,editCourseDetails,createCourse } from '../../../../../services/operations/courseDetailsApi'
import ChipInput from './ChipInput' 
import Upload from '../Upload'
import RequirementsField from './RequirementsField'
import IconBtn from '../../../../common/IconBtn'
import { MdNavigateNext } from "react-icons/md"
import { setCourse,setStep } from '../../../../../slices/courseSlice'
import { toast } from 'react-hot-toast'
import { COURSE_STATUS } from '../../../../../utils/constants'
const CourseInformationForm = () => {
    const { register, handleSubmit, getValues, setValue,
        formState: { errors }
    } = useForm();
    const dispatch = useDispatch();
    const { course, editCourse } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    
    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories)
            }
            setLoading(false);
        }
        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatWillYouLearn)
            setValue("courseCategory", course.category)
            setValue("courseImage", course.thumbnail)
            setValue("courseRequirements", course.instructions)

        }
        getCategories();
    },[])
    const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.courseTitle!==course.courseName||
           currentValues.courseShortDesc!==course.courseDescription||
           currentValues.coursePrice!==course.price||
           currentValues.courseTags.toString() !==course.tag.toString()||
           currentValues.courseBenefits!==course.whatWillYouLearn||
           currentValues.courseCategory._id !== course.category._id||
           currentValues.courseImage !==course.thumbnail||
           currentValues.coursRequirements.toString()!==course.instructions.toString()){
            return true;
           }
           else{
            return false;
           }
    }
    const onSubmit = async (data) => {
         if(editCourse){
            if(isFormUpdated()){
                const currentValues=getValues();
                const formData=new FormData();
                formData.append("courseId",course._id)
                if(currentValues.courseTitle!==course.courseName){
                   formData.append("courseName",data.courseTitle)
                }
                if(currentValues.courseShortDesc!==course.courseDescription){
                    formData.append("courseDescription",data.courseShortDesc)
                }
                if(currentValues.coursePrice!==course.price){
                  formData.append("price",data.coursePrice)
                }
                if(currentValues.courseTags.toString() !==course.tag.toString()){
                    formData.append("tag",JSON.stringify(data.courseTags));
                }
                if(currentValues.courseBenefits!==course.whatWillYouLearn){
                    formData.append("whatWillYouLearn",data.courseBenefits)
                }
                if(currentValues.courseCategory._id!==course.category._id){
                    formData.append("category",data.courseCategory)
                }
                if(currentValues.courseImage!==course.thumbnail){
                    formData.append("thumbnailImages",data.courseImage)
                }
                if(currentValues.coursRequirements.toString()!==course.instructions.toString()){
                    formData.append("instructions",JSON.stringify(data.coursRequirements))
                }
                setLoading(true)
                // console.log('hello');
                
                const result=await editCourseDetails(formData,token)
                // console.log("hiii");
                // console.log("result.......",result)
                setLoading(false)
                if(result){
                    dispatch(setCourse(result))
                    dispatch(setStep(2))
                }

            }
            else{
                toast.error("No changes made to the form")
            }
            return;
         }
         const formData = new FormData()
         formData.append("courseName", data.courseTitle)
         formData.append("courseDescription", data.courseShortDesc)
         formData.append("price", data.coursePrice)
         formData.append("tag", JSON.stringify(data.courseTags))
         formData.append("whatWillYouLearn", data.courseBenefits)
         formData.append("category", data.courseCategory)
         formData.append("status", COURSE_STATUS.DRAFT)
         formData.append("instructions", JSON.stringify(data.courseRequirements))
         formData.append("thumbnailImages", data.courseImage)
         setLoading(true)
         console.log('hello');
         
         const result = await createCourse(formData, token)
         console.log('hiiii');
         console.log("result............",result)
         if (result) {
           dispatch(setStep(2))
           dispatch(setCourse(result))
         }
         setLoading(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            {/* course title */}
            <div className='flex flex-col space-y-2'>
                <label className='lable-style' htmlFor="courseTitle">
                    Course Title <sup className='text-pink-200'>*</sup>
                </label>
                <input placeholder='Enter Course Title' id="courseTitle" {...register("courseTitle", { required: true })} className='form-style w-full' />
                {errors.courseTitle && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course title is required
                    </span>
                )}
            </div>
            {/* course description */}
            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseShortDesc" className='lable-style'>
                    Course Short Description <sup className='text-pink-200'>*</sup>
                </label>
                <textarea
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    {...register("courseShortDesc", { required: true })}
                    className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.courseShortDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Description is required
                    </span>
                )}
            </div>
            {/* course price */}
            <div className='flex flex-col space-y-2'>
                <label htmlFor="coursePrice" className='lable-style'>
                    Course Price <sup className='text-pink-200'>*</sup>
                </label>
                <div className='relative'>
                    <input id="coursePrice" placeholder='Enter Course Price' type='number'
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true,
                            pattern: {
                                value: /^(?:100000|\d{1,5})$/,
                            }
                        })}
                        className='form-style w-full !pl-12'
                    />
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                </div>
                {errors.coursePrice && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Price is required
                    </span>
                )}
            </div>
           
            {/* course category */}
            <div className='flex flex-col space-y-2'>
                <label className='lable-style' htmlFor="courseCategory">
                    Course Category <sup className='text-pink-200'>*</sup>
                </label>
                <select defaultValue={""}  id="courseCategory" {...register("courseCategory",{required:true})} className='form-style w-full'>
                 <option value="" disabled>
                    Choose a Category
                 </option>
                 {!loading && (
                    courseCategories.map((category,index)=>(
                        <option value={category._id} key={index}>
                            {category.name}
                        </option>
                    ))
                 )}
                </select>
                {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
            </div>
            {/* course Tags */}
              <ChipInput label="Tags" register={register} name="courseTags" setValue={setValue} errors={errors} 
                placeholder="Enter Tags and press Enter"
              />
             
              {/* Course Thumbnail Image */}
              <Upload label="Course Thumbnail" register={register} name="courseImage"
              setValue={setValue} errors={errors} editData={editCourse ? course?.thumbnail:null}
                
              />
              {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
       {/* Requirements/Instructions */}
       <RequirementsField
         name="courseRequirements"
         label="Requirements/Instructions"
         register={register}
         setValue={setValue}
         errors={errors} />

         <div className="flex justify-end gap-x-2">
            {
                editCourse && (
                    <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>
                )
            }
            <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
         </div>
        </form>
    )
}

export default CourseInformationForm
