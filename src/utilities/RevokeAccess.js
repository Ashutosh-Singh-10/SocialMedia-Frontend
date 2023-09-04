import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cook from "../utilities/GetCookie.js";
import Cookies from 'universal-cookie';

export default function RevokeAccess() {



  const [x, setX] = useState(100000)
  const getAccess = () => {
    const url = process.env.REACT_APP_BACKEND_URL + "/login/refresh"


    const cookies = new Cookies();
    axios.post(url, {

      refresh: Cook("refresh")

    }
    ).then((res) => {
      cookies.set('access', res.data.access, { path: '/' });
      console.log(Cook("access"))
      setX(250000);

      return 1;

    }).catch((err) => {
      console.log(err)
      setX(110000);



      return 0;
    })
  }


  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      console.log(process.env.REACT_APP_BACKEND_URL)
      getAccess()
      setTimer(timer + 1);
    }, x);

    return () => {
      clearTimeout(intervalId);
    };
  }, [timer]);








  return (
    <div>
      {/* the timer is        {timer} */}
    </div>
  )
}
