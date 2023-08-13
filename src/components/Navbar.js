import React, { useEffect, useState } from 'react'
import "../assets/css/navbar.css"
import { NavLink, ScrollRestoration } from 'react-router-dom'
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { MdExplore } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import UserSearch from './UserSearch'
import { useRef } from 'react'

export default function Navbar() {
  const [searchPop, setSearchPop] = useState(false);
  const SearchPopRef = useRef();
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
            <AiFillHome />
            <NavLink to='/' preventScrollReset>Home</NavLink>
          </li>
          <li ref={SearchPopRef} >
            <AiOutlineSearch />
            {/* <NavLink to='/userSearch' preventScrollReset>Search</NavLink> */}
            <button onClick={handleClick} >Search</button>

          </li>
          <li>
            <MdExplore />
            <NavLink to='/explore'>Explore</NavLink>
          </li>
          <li>
            <CgProfile />
            <NavLink to='/users/Ashu' preventScrollReset>Profile</NavLink>
          </li>
          {/* <li><NavLink to={'/users/Jo'} preventScrollReset>Jo</NavLink></li> */}
          <li><NavLink to={'/logout'} replace>Logout</NavLink></li>
        </ul>

      </nav>
      <UserSearch isVisible={searchPop} setVisible={setSearchPop} buttonref={SearchPopRef} />
    </header>

  )
}
