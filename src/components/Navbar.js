import React, { useEffect } from 'react'
import "../assets/css/navbar.css"
import { NavLink } from 'react-router-dom'
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
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <AiOutlineSearch />
            <NavLink to='/search'>Search</NavLink>
          </li>
          <li>
            <MdExplore />
            <NavLink to='/explore'>Explore</NavLink>
          </li>
          <li>
            <CgProfile />
            <NavLink to='/users/Ashu'>Profile</NavLink>
          </li>
        </ul>
      </nav>
    </header>

  )
}
