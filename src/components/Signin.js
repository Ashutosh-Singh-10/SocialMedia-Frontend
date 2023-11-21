import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import { useContext } from 'react';
import ErrorContext from '../context/ErrorProvider';
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("")
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const { errMsg, setErrMsg, errRef } = useContext(ErrorContext);
  // console.log(errRef.current);
  useEffect(() => {
    setErrMsg('');
  }, [email, password, username]);
  const navigate = useNavigate();
  const sendOtp = () => {
    const url = process.env.REACT_APP_BACKEND_URL + "/login/otp"
    console.log("otp generation started")
    axios
      .post(url, {
        "email": email
      })
      .then((res) => {
        setIsOtpSent(true);
        if (res.status == 200) {
          setErrMsg("OTP Send");
        }
        console.log(res)
      }).catch((err) => {
        console.log(err);
        if (!err?.response) {
          console.log("jai")
          setErrMsg('No Server Response');
        }
        else {
          console.log(err?.response)
          setErrMsg(err?.response?.data?.message);
          // errRef.current.focus();
          // console.log(error?.response?.data?.message);
        }
        // errRef.current.focus();
      })

  }
  const createUser = () => {
    const url = process.env.REACT_APP_BACKEND_URL + "/login/createuser"
    console.log("user creation started")
    // console.log("otp generation started")
    axios
      .post(url, {
        "email": email,
        "username": username,
        "password": password,
        "otp": Number(otp)

      })
      .then((res) => {
        console.log("user ban gya h ")
        console.log(res);
        navigate('/login', { replace: true });
      }).catch((err) => {
        console.log("user nahi bna")
        if (!err?.response) {
          // console.log("jai")
          setErrMsg('No Server Response');
        }
        else {
          console.log(err?.response)
          setErrMsg(err?.response?.data?.message);
          // errRef.current.focus();
          // console.log(error?.response?.data?.message);
        }
        console.log(err)
      })


  }
  return (
    <>

      <div className='flexCenter pabsolute lg-cnt'>

        <div className=' flexCenter lg-cn1'>

          <div className='w35 flexVC  lg-bx-rt'>
            <div className='lg-bx1 flexVC borderBlack w100'
              // onSubmit={login}
              style={{ display: isOtpSent === false ? "flex" : "none" }}
            >
              <div className="lg-logo">
              <span style={{color:'red'}}>S</span>
          <span style={{color:'yellow'}}>o</span>
          <span style={{color:'lime'}}>c</span>
          <span style={{color:'orange'}}>i</span>
          <span style={{color:'pink'}}>a</span>
          <span style={{color:'cyan'}}>l</span>
              </div>
              <div style={{ margin: '0' }}>{errMsg}</div>
              <div className='flexVC lg-wd1' >
                <div className='w100 textS'
                >Enter username</div>
                <input type="text " className='w100 lg-in br-rd4'
                  value={username} onChange={(e) => { setUsername(e.target.value) }}
                // onChange={(e) => setUsername(e.target.value)}
                // value={username}
                />
              </div>
              <div className='flexVC lg-wd1' >
                <div className='w100 textS'
                >Enter Email</div>
                <input type="text " className='w100 lg-in br-rd4'
                  value={email} onChange={(e) => { setEmail(e.target.value) }}

                // onChange={(e) => setUsername(e.target.value)}
                // value={username}
                />
              </div>
              <div className='flexVC lg-wd1'>
                <div className='w100 textS '>Password</div>
                <input type="text " className='w100 lg-in br-rd4'
                  value={password} onChange={(e) => { setPassword(e.target.value) }}
                // onChange={(e) => setPassword(e.target.value)}
                // value={password}
                />
              </div>
              <button className='lg-btn lg-ft1 br-rd4' onClick={sendOtp} disabled={(email && password && username) ? false : true}>
                Generate OTP</button>


            </div>
            <div className='lg-bx1 flexVC borderBlack w100'
              // onSubmit={login}
              style={{ display: isOtpSent === true ? "flex" : "none" }}
            >
              <div className="lg-logo">
                Social Network
              </div>
              <div className='flexVC lg-wd1' >
                <div className='w100 textS'
                >Enter OTP</div>
                <input type="number " className='w100 lg-in br-rd4'
                  value={otp} onChange={(e) => { setOtp(e.target.value) }}
                // onChange={(e) => setUsername(e.target.value)}
                // value={username}
                />
              </div>


              <button className='lg-btn lg-ft1 br-rd4'
                onClick={createUser} disabled={otp ? false : true}
              >
                Create User</button>


            </div>
            <div className='flexCenter lg-bx2 w100 borderBlack'
            >
              Already have  account?&nbsp;<Link to={'/login'} className='lg-link'>Log in</Link>

            </div>
          </div>
          <div className='w65 h100 lg-bx-lf'>
            <img src={require('../assets/images/signup/Sign up Customizable Isometric Illustrations _ Amico Style.png')} className="imgFull" alt=""
              style={{ marginLeft: "20px" }}
            />
          </div>
        </div>




        {/* <div>
< div style={{backgroundColor:"white",display:isOtpSent===false?"block":"none"}}>
  <input type="email" placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
  <input type="username" placeholder='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
  <input type="password" placeholder='password'value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
  <br />
  <button onClick={sendOtp}>
    Send OTP
  </button>
  <br />  
  {message}
  </div>
  <br /><br />
  <div style={{display:isOtpSent===true?"block":"none"}}>
    otp
    <input type="number" placeholder='otp' value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
    <button onClick={createUser}>
      Create user
    </button>
  </div>


</div> */}

      </div>


    </>

  )
}
