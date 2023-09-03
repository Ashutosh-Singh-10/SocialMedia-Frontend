import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Logout = () => {
    const cookies = new Cookies();
    cookies.remove('access', { path: '/' });
    cookies.remove('refresh', { path: '/' });
    cookies.remove('username', { path: '/' });
    const navigate = useNavigate();
    return (
        <Navigate to='/login' replace={true} />
    )
}

export default Logout