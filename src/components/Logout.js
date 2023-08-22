import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Logout = () => {
    const cookies = new Cookies();
    cookies.remove('access');
    cookies.remove('refresh');
    return (
        <Navigate to='/login' replace={true} />
    )
}

export default Logout