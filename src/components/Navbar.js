import React, { useEffect } from 'react'
import "../assets/css/navbar.css"
import { NavLink, ScrollRestoration } from 'react-router-dom'
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { MdExplore } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
export default function Navbar() {
  useEffect(() => {
    console.log("jai")
  })
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
          <li>
            <AiOutlineSearch />
            <NavLink to='/userSearch' preventScrollReset>Search</NavLink>
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
    </header>

  )
}
