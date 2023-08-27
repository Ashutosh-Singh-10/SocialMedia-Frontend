import React from 'react'
import "./../assets/css/login.css"
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie';
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom';
export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

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
      console.log(uri);
      // window.location = uri
      navigate(uri, { replace: true });

      // <Navigate to={`${uri}`} replace={true} />
    }).catch((res) => { console.log(res) })
  }




  return (
    <div className='flexCenter pabsolute lg-cnt'>

      <div className=' flexCenter lg-cn1'>
        <div className='w65 h100'>
          <img src={require('../assets/images/loginlogo.png')} className="imgFull" alt="" />
        </div>
        <div className='w35 flexVC '>
          <form className='lg-bx1 flexVC  w100' onSubmit={login}>
            <div className="lg-logo">
              Social Network
            </div>
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


          </form>
          <div className='flexCenter lg-bx2 w100 '
          >
            Don't have account?

          </div>
        </div>
      </div>


    </div>

  )
}
