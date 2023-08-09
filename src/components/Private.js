import React from 'react'
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { actionCreators } from '../state/index'
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Cook from "../utilities/GetCookie.js";

export default function Private({ children }) {

  const navigate = useNavigate();

  const access = Cook("access")
  console.log(access)
  const dispatch = useDispatch();
  const { setUri } = bindActionCreators(actionCreators, dispatch);
  setUri(window.location.pathname)
  return (
    access ? children : <Navigate to='login' replace={true} />

  )
}
