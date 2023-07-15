import React from 'react'
import {Navigate,Outlet} from "react-router-dom"
import {actionCreators} from '../state/index'
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export default function Private() {

  const getCookie=(cname)=> {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const access=getCookie("access")
  console.log(access)
  const dispatch=useDispatch();
  const {setUri}=bindActionCreators(actionCreators,dispatch);
  setUri(window.location.pathname)
  return (
    access?<Outlet/>:<Navigate to='/login'/>
    

  )
}
