import React from 'react'
import { useState } from 'react'
import axios from 'axios';
export default function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [message,setMessage]=useState("")
  const [otp,setOtp]=useState(0)
  const [isOtpSent,setIsOtpSent]=useState(false);

  const sendOtp=()=>{
    const url=process.env.REACT_APP_BACKEND_URL+"/login/otp"
    console.log("otp generation started")
    axios
    .post(url,{
      "email":email
    })
    .then((res) => {
      setIsOtpSent(true)
    }).catch((err)=>{

    })

  }
  const createUser=()=>{
    const url=process.env.REACT_APP_BACKEND_URL+"/login/createuser"
    console.log("otp generation started")
    axios
    .post(url,{
      "email":email,
      "username":username,
      "password":password,
      "otp":Number(otp)

    })
    .then((res) => {

    }).catch((err)=>{
      console.log(err)
    })


  }
  return (
    <div>
    < div style={{backgroundColor:"white",display:isOtpSent===false?"block":"none"}}>
      <input type="email" placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type="username" placeholder='username'value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
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

    
    </div>
  )
}
