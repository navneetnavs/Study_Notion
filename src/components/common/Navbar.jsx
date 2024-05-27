import React from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, useLocation, matchPath } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import {IoIosArrowDropdownCircle} from "react-icons/io";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { AiOutlineShoppingCart,AiOutlineMenu} from 'react-icons/ai';
import NavbarModal from './NavbarModal'
import {RxCross1} from "react-icons/rx"
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const {totalItems}=useSelector((state)=>state.cart);
  const location = useLocation();
 
  const [subLinks, setSubLinks] = useState([]); 
  const [display,setDisplay]=useState(false);
  
 
  const matchRoutes = (route) => {
    return matchPath({ path: route }, location.pathname)
  }
  useEffect(() => { 
    ;(async () => {
      
      try {
       
        const response = await apiConnector('GET', categories.CATEGORIES_API);
        
        
        setSubLinks(response.data.data);
      } catch (error) {
        console.log("Could not fetch the category list")
      }
    } ) ()
  }, [])
  return (
    <>

    <div className='border-b-2 bg-richblack-800 border-richblack-700 h-14 flex items-center '>
      <div className='w-11/12 max-w-maxContent mx-auto flex justify-between items-center '>
        <Link to={"/"}>
          <img src={logo} alt="logo" loading='lazy' width={160} height={42} />
        </Link>
        <ul className=' relative  text-white gap-4 hidden md:flex '>
          {
            NavbarLinks.map((element, index) => (
              <li key={index}>
                {
                  element.title === "Catalog" ? (
                    <div className='flex relative  cursor-pointer items-center gap-x-1 group'>
                      <p>{element.title}</p>
                      <IoIosArrowDropdownCircle/>
                      <div className='invisible z-[1000]   opacity-0 group-hover:visible group-hover:opacity-100 absolute p-4 top-[153%] translate-x-[-50%] left-[60%] flex flex-col transition-all duration-200 bg-richblack-5 text-richblack-900 rounded-md lg:w-[300px]'>
                       <div className='absolute  h-6 w-6 left-[54%] -top-3 rotate-45 bg-richblack-5'>

                       </div>
                       {
                        subLinks.length? (
                          subLinks.map((subLink,index)=>(
                            <Link className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                           <p>{subLink.name}</p>
                            </Link>
                          ))
            ):(<div></div>)
                       }
                      </div>
                    </div>
                  ) : (<Link to={element?.path}>
                    <p className={`${matchRoutes(element?.path) ? "text-yellow-200" : "text-white"}`}>{element.title}</p>
                  </Link>)
                }
              </li>
            ))
          }
        </ul>
        {/* login/signup/dashboard */}
        <div className=' gap-x-4 items-center hidden md:flex'>
        {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {
            token === null && (<Link to={"/login"}>
              <button className='text-richblack-100  bg-richblack-700 rounded-md px-[12px] py-[8px]'>
                Log in
              </button>
            </Link>)
          }
          {
            token === null && (<Link to={"/signup"}>
              <button className='text-richblack-100  bg-richblack-700 rounded-md px-[12px] py-[8px]'>
                Sign up
              </button>
            </Link>

            )
          }
          {
            token!==null && (<ProfileDropDown/>)
          }
        </div>
        <div className='block cursor-pointer transition-all duration-200
         md:hidden' onClick={()=>setDisplay((prev)=>!prev)}>
        {
                     
          display ? (<RxCross1 fontSize={24} className='text-white' />):(<AiOutlineMenu fontSize={24} className='text-white' />)
        }

        </div>
        
      </div>

    </div>
    {
      display && (<NavbarModal display={display} setDisplay={setDisplay}   />)
    }
    </>
  )
}

export default Navbar
