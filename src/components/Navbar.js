import React, { useEffect } from 'react'
import "../assets/css/navbar.css"
import { NavLink } from 'react-router-dom'

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
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/search'>Search</NavLink>
          </li>
          <li>
            <NavLink to='/explore'>Explore</NavLink>
          </li>
          <li>
            <NavLink to='/prfile'>Profile</NavLink>
          </li>
        </ul>
      </nav>
    </header>

  )
}
