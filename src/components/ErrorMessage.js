import React from 'react'
import '../assets/css/errorMessage.css';
import { useContext } from 'react';
import ErrorContext from '../context/ErrorProvider';
const ErrorMessage = ({ children }) => {
    const { errMsg, errRef } = useContext(ErrorContext);
    return (
        <div ref={errRef} className='errorBox'>
            <div className='ErrorMessage' >error</div>
        </div>

    )
}

export default ErrorMessage