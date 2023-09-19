import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from './Navbar'
// import ErrorMessage from './ErrorMessage'

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <ScrollRestoration
                getKey={(location, matches) => {
                    return location.pathname;
                }}
            />
        </>
    )
}

export default Layout