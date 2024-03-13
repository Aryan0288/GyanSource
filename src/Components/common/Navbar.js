import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo/do-rgb_prev_ui.png';
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux';
import { BsCart4 } from "react-icons/bs";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../Services/apiConnector';
import { categories } from '../../Services/apis';
import { IoIosArrowDown } from "react-icons/io";
// import { matchPath } from 'react-router-dom'; // Example import for React Router

// const subLinks = [
//   {
//     title: "python",
//     link: "/Catalog/python"
//   },
//   {
//     title: "Java",
//     link: "/Catalog/java",
//   }
// ];

const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const [subLinks, setSubLinks] = useState([]);

  // const fetchSubLinks = async () => {
  //   try {
  //     const result = await apiConnector("GET",categories.CATEGORIES_API);
  //     console.log("Printing result : ", result.data.data);
  //     subLinks(result.data.data);
  //   } catch (err) {
  //     console.log("Could not fetch the categories list",err);
  //   }
  // }
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // fetchSubLinks();
    (async () => {
      // setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
        console.log("fetch data successfully: ", res);
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      // setLoading(false)
    })()
  }, [])

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  console.log("subLink: ", subLinks);
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className=' flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/" className=''>
          <img className='w-52' src={logo} loading='lazy' />
        </Link>

        {/* nav links */}
        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {
              NavbarLinks.map((links, index) => {
                return (

                  <li key={index}>
                    {
                      links.title === 'Catalog' ? (
                        <div className='flex items-center gap-1 relative group cursor-pointer'>
                          <p>{links.title}</p>
                          <IoIosArrowDown />

                          <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split("/")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>

                        </div>
                      ) : (
                        <Link to={links?.path}>
                          <p className={`${matchRoute(links?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                            {links.title}
                          </p>
                        </Link>
                      )
                    }
                  </li>
                )
              })
            }
          </ul>
        </nav>



        {/* login and signup */}
        <div className='flex gap-x-4 items-center '>
          {
            user && user?.accountType != "Instructor" && (
              <Link to="/dashboard/cart" className='relative text-white'>
                <BsCart4 />
                {
                  totalItems > 0 && (
                    <span>{totalItems}</span>
                  )
                }
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/login">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                  SignIn
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/signup">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                  SignUp
                </button>
              </Link>
            )
          }
          {
            token !== null && <ProfileDropDown />
          }
        </div>
      </div>
    </div >
  )
}

export default Navbar;