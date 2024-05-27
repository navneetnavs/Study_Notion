import React from 'react'
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { useState, useEffect } from 'react'

import { useSelector,useDispatch } from 'react-redux'
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link,useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authApi';
import { ACCOUNT_TYPE } from '../../utils/constants';
const NavbarLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
        title: "About Us",
        path: "/about",
    },
    {
        title: "Contact Us",
        path: "/contact",
    },
    {
      title: "Catalog",
      // path: '/catalog',
    },
  ]
const NavbarModal = ({display,setDisplay}) => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [subLinks, setSubLinks] = useState([]);
    
    const dispatch=useDispatch();
    const navigate=useNavigate()

    useEffect(() => {
        ; (async () => {

            try {

                const response = await apiConnector('GET', categories.CATEGORIES_API);


                setSubLinks(response.data.data);
            } catch (error) {
                console.log("Could not fetch the category list")
            }
        })()
    }, [])
   const handleModal=()=>{
    if(display){
        setDisplay(false)
    }
   }
    return (
        <div className="fixed transition-all duration-500 inset-0 z-[1000] bg-white  grid top-[3.5rem] place-items-center overflow-auto  bg-opacity-10 backdrop-blur-sm">
            <div className="w-[100%]  rounded-lg   p-6">

                <div className='flex flex-col gap-4 items-center'>
                    {
                        NavbarLinks.map((element, index) => (
                            <ul key={index} className='text-white' onClick={ ()=> handleModal()
                               
                            }>
                                {
                                    element.title === "Catalog" ? (
                                        <div className='flex relative  cursor-pointer items-center gap-x-1 group'>
                                            <p className='te'>{element.title}</p>
                                            <IoIosArrowDropdownCircle />
                                            <div className='invisible z-[1000]   opacity-0 group-hover:visible group-hover:opacity-100 absolute p-4 top-[153%] translate-x-[-50%] left-[60%] flex flex-col transition-all duration-200 bg-richblack-5 text-richblack-900 rounded-md lg:w-[300px]'>
                                                <div className='absolute  h-6 w-6 left-[54%] -top-3 rotate-45 bg-richblack-5'>

                                                </div>
                                                {
                                                    subLinks.length ? (
                                                        subLinks.map((subLink, index) => (
                                                            <Link className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                                                <p>{subLink.name}</p>
                                                            </Link>
                                                        ))
                                                    ) : (<div></div>)
                                                }
                                            </div>
                                        </div>
                                    ) : (<Link to={element?.path}>
                                        <p className={"text-white"}>{element.title}</p>
                                    </Link>)
                                }
                            </ul>
                        ))
                    }

                    {


                        token === null && (<Link to={"/login"} >
                            <button onClick={()=> handleModal()} className='text-white  bg-richblack-800 rounded-md   py-[8px] px-[12px] text-sm  hover:bg-richblack-700 hover:text-richblack-25 '>
                                Log in
                            </button>
                        </Link>)
                    }
                    {
                        token === null && (<Link to={"/signup"} >
                            <button onClick={()=> handleModal()} className='text-white  bg-richblack-800 rounded-md   py-[8px] px-[12px] text-sm  hover:bg-richblack-700 hover:text-richblack-25'>
                                Sign up
                            </button>
                        </Link>

                        )
                    }
                    {
                        token !== null && ( <Link to={"/dashboard/my-profile"} > 
                            <button onClick={()=> handleModal()} className='text-white flex bg-richblack-800 rounded-md  items-center gap-x-1 py-[8px] px-[12px] text-sm  hover:bg-richblack-700 hover:text-richblack-25'>
                            <VscDashboard className="text-lg"/>
                                Dashboard
                            </button>
                        </Link> )
                    }
                    {
                        token !== null && (
                            <button onClick={ ()=>(dispatch(logout(navigate)) , handleModal()) } className='text-white rounded-md flex  items-center gap-x-1 py-[8px] px-[12px] text-sm bg-richblack-800  hover:bg-richblack-700 hover:text-richblack-25'>
                            <VscSignOut className='text-lg'/>
                            Logout
                            </button>
                        )
                    }
                    {
                        user?.accountType===ACCOUNT_TYPE.STUDENT && (
                            <Link to={"/dashboard/enrolled-courses"}>
                             <div onClick={()=> handleModal()} className='text-white  bg-richblack-800 rounded-md    py-[8px] px-[12px] text-sm  hover:bg-richblack-700 hover:text-richblack-25'>
                               Enrolled courses
                             </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default NavbarModal
