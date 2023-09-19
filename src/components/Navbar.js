import React, { useEffect, useState } from 'react'
import "../assets/css/navbar.css"
import { NavLink, ScrollRestoration } from 'react-router-dom'
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { MdExplore } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import UserSearch from './UserSearch'
import { useRef } from 'react'
import ProfileDropDown from './ProfileDropDown'
import { useQuery } from 'react-query'
import Cookies from 'universal-cookie'
import Cook from '../utilities/GetCookie'
import axios from 'axios'
import ErrorMessage from './ErrorMessage'
export default function Navbar() {
  const [searchPop, setSearchPop] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const profileDropDownRef = useRef();
  const SearchPopRef = useRef();
  const url = process.env.REACT_APP_BACKEND_URL;
  const cookies = new Cookies();
  const userId = cookies.get('username', { path: '/' });
  let token = Cook("access");
  const { data: userData, isLoading: userLoading, refetch: refetchUserData } = useQuery(`${userId}`, () => {
    // const url1 = url + "/profile/userfeeds"
    // console.log('Jai');
    const url2 = url + "/profile/userprofile"
    return axios.post(url2,
      {
        "username": userId,

      },
      {
        headers: {
          Authorization: "Bearer " + token

        },
      }


    )
  }, {
    cacheTime: 86400000,
    // refetchInterval: 2000
    // refetchOnWindowFocus: false,
  });


  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!searchPop) {
      setSearchPop(true);
    }
    else {
      setSearchPop(false);
    }
  }
  const handlDropDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setProfileDropDown(!profileDropDown);
  }
  // const buttonClickCheck = (e) => {
  //   if (!SearchPopRef.current.contains(e.target)) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  // console.log(SearchPopRef)
  // useEffect(() => {
  //   const listener = (event) => {
  //     // Do nothing if clicking ref's element or descendent elements
  //     if (!ref.current || ref.current.contains(event.target)) {
  //       return;
  //     }
  //     handler(event);
  //   };
  //   document.addEventListener("mousedown", listener);
  //   document.addEventListener("touchstart", listener);
  //   return () => {
  //     document.removeEventListener("mousedown", listener);
  //     document.removeEventListener("touchstart", listener);
  //   };
  // })
  return (
    <header className='navbar'>
      <div className='brand-name'>
      </div>
      <nav>
        <ul>
          <li>

            <NavLink to='/' preventScrollReset><AiFillHome style={{ marginRight: '10px' }} /><span className='navbarSpan'>Home</span></NavLink>
          </li>
          <li ref={SearchPopRef} >

            {/* <NavLink to='/userSearch' preventScrollReset>Search</NavLink> */}
            <button onClick={handleClick} ><AiOutlineSearch style={{ fontSize: '1.5rem', marginRight: '5px' }} /><span className='navbarSpan'>Search</span></button>

          </li>
          <li>

            <NavLink to='/explore'><MdExplore style={{ marginRight: '10px' }} /><span className='navbarSpan'>Explore</span></NavLink>
          </li>
          <li ref={profileDropDownRef}>

            <button onClick={handlDropDown} ><img src={userData?.data?.avatar} style={{ height: '30px', marginRight: '10px', aspectRatio: '1/1', borderRadius: '100%', objectFit: "cover" }} /><span className='navbarSpan'>Profile</span></button>
            <ProfileDropDown dropDownVisible={profileDropDown} setDropDownVisible={setProfileDropDown} profileDropDownRef={profileDropDownRef} />
          </li>
          {/* <li><NavLink to={'/users/Jo'} preventScrollReset>Jo</NavLink></li> */}
          {/* <li><NavLink to={'/logout'} replace>Logout</NavLink></li> */}
        </ul>

      </nav>
      <UserSearch isVisible={searchPop} setVisible={setSearchPop} buttonref={SearchPopRef} />
      {/* <ErrorMessage /> */}
    </header>

  )
}
