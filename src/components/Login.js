import React, { useContext, useEffect } from 'react'
import "./../assets/css/login.css"
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie';
import axios from "axios"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import ErrorContext from '../context/ErrorProvider';
export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const { errMsg, setErrMsg, errRef } = useContext(ErrorContext);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);
  const uri = useSelector(state => state.uri)
  const login = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = process.env.REACT_APP_BACKEND_URL + "/login/"
    axios.post(url,
      {
        "username": username,
        "password": password
      }

    ).then((res) => {

      console.log(res)
      const cookies = new Cookies();
      // cookies.set('accesstoken', res.data.access);
      cookies.set('refresh', res.data.refresh, { path: '/' });
      cookies.set('access', res.data.access, { path: '/' });
      cookies.set('username', username, { path: '/' });
      console.log(uri);
      // window.location = uri
      navigate(uri, { replace: true });

      // <Navigate to={`${uri}`} replace={true} />
    }).catch((err) => {
      console.log(err)
      if (!err?.response) {
        console.log("jai")
        setErrMsg('No Server Response');
      }
      else {
        console.log(err?.response)
        setErrMsg(err?.response?.data?.detail);
        // errRef.current.focus();
        // console.log(error?.response?.data?.message);
      }
    })
  }


  const testLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = process.env.REACT_APP_BACKEND_URL + "/login/"
    axios.post(url,
      {
        "username": "Ashu",
        "password": "ashutosh"
      }

    ).then((res) => {

      // console.log(res)
      const cookies = new Cookies();
      // cookies.set('accesstoken', res.data.access);
      cookies.set('refresh', res.data.refresh, { path: '/' });
      cookies.set('access', res.data.access, { path: '/' });
      cookies.set('username', "Ashu", { path: '/' });
      // console.log(uri);
      // window.location = uri
      navigate(uri, { replace: true });

      // <Navigate to={`${uri}`} replace={true} />
    }).catch((res) => { console.log(res) })
  }

  return (
    <>
      {/* <ErrorMessage /> */}
      <div className='flexCenter pabsolute lg-cnt'>

        <div className=' flexCenter lg-cn1'>
          <div className=' h100 lg-bx-lf'>
            <img src={require('../assets/images/login/Mobile login Customizable Semi Flat Illustrations _ Pana Style.png')} className="imgFull lg-im" alt="" />
          </div>
          <div className='w35 flexVC lg-bx-rt'>
            <form className='lg-bx1 flexVC  w100' onSubmit={login}>
              <div className="lg-logo">

          <span style={{color:'red'}}>S</span>
          <span style={{color:'yellow'}}>o</span>
          <span style={{color:'lime'}}>c</span>
          <span style={{color:'orange'}}>i</span>
          <span style={{color:'pink'}}>a</span>
          <span style={{color:'cyan'}}>l</span>
              </div>
              <div>{errMsg}</div>
              <div className='flexVC lg-wd1' >
                <div className='w100 textS'
                >Enter username</div>
                <input type="text " className='w100 lg-in br-rd4'

                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className='flexVC lg-wd1'>
                <div className='w100 textS '>Password</div>
                <input type="text " className='w100 lg-in br-rd4'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <button className='lg-btn lg-ft1 br-rd4'>
                Login</button>
              <button className='lg-btn lg-ft1 br-rd4 lg-tt-bt' onClick={testLogin}>
                Take a Test</button>


            </form>
            <div className='flexCenter lg-bx2 w100'
            >
              Don't have account?&nbsp;<Link to={'/signin'} className='lg-link'> Sign in</Link>

            </div>
          </div>
        </div>


      </div>
    </>


  )
}
