import React from 'react'
import { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form'
import CountryCode from '../../data/countrycode.json';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
const ContactUsForm = () => {
    const [loading,setLoading]=useState(false);
    const {register,handleSubmit,reset,
    formState:{isSubmitSuccessful,errors}}=useForm();
    const submitContactForm=async(data)=>{
      console.log("Logging data ", data);
      try {
        setLoading(true);
        const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);

        setLoading(false);
      } catch (error) {
        console.log('error message ',error);
        setLoading(false);
        
      }
    }
    useEffect(()=>{
        if(isSubmitSuccessful){
          reset({
            email:"",
            firstName:"",
            lastName:"",
            message:"",
            phoneNo:""

          })
        }
    },[reset,isSubmitSuccessful]);
  return (
    <form onSubmit={handleSubmit(submitContactForm)} >
    <div className='flex flex-col gap-7'>

        <div className='flex gap-5 flex-col lg:flex-row'>
        {/* firstName */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
                <label className='lable-style' htmlFor="firstName">First Name</label>
                <input className='form-style' type="text" name="firstName" id='firstName' placeholder='Enter first name'{...register('firstName',{required:true})} />
                {
                    errors.firstName && (
                        <div className="-mt-1 text-[12px] text-yellow-100"> Please enter your  name</div>
                    )
                }
            </div>
            {/* lastName */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
                <label className=' lable-style' htmlFor="lastName">Last Name</label>
                <input type="text" className='form-style' name="lastName" id='lastName' placeholder='Enter last name' {...register('lastName')}  />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <label className='lable-style' htmlFor="email">Email Address</label>
            <input className='form-style' type="email" name='email' id='email' placeholder='Enter email address' {...register('email',{required:true})} />
            {errors.email && (
                <div className="-mt-1 text-[12px] text-yellow-100" >Please enter your email address</div>
            )}
        </div>
        <div className='flex flex-col gap-2'>
        <label htmlFor="phoneNumber" className='lable-style'>Phone Number</label>
        <div className='flex gap-5'>
        <div className="flex w-[81px] flex-col gap-2">

            <select className='form-style' name="dropdown" id="dropdown" {...register('countryCode',{required:true})}>
             {
                CountryCode.map((element,index)=>(
                    <option key={index}  value={element.code}>
                        {element.code}-{element.country}
                    </option>
                ))
             }
            </select>
        </div>
        <div className="flex w-[calc(100%-90px)] flex-col gap-2">

            <input className='form-style' type="number" name="phoneNumber" id="phoneNumber" placeholder='1234567890' {...register('phoneNo',{required:{value:true ,message:'Please enter phone number'},
            maxLength:{value:10,message:'Invalid phone number'},
            minLength:{value:8,message:'Invalid phone number'}}
            )} />
        </div>
        </div>
        {
            errors.phoneNo && (
                <div className="-mt-1 text-[12px] text-yellow-100">{errors.phoneNo.message}</div>
            )
        }
        </div>
        <div className='flex flex-col gap-2'>
            <label className='lable-style' htmlFor="message">Message</label>
          <textarea className='form-style' name="message" id="message" cols="30" rows="7" placeholder='Enter your message here' {...register('message',{required:true})}/>
          {
            errors.message && (
                <div className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your message
                </div>
            )
          }
 
        </div>
        <button disabled={loading} className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `} type="submit">Send Message</button>
    </div>
    </form>
  )
}

export default ContactUsForm
