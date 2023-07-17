import React from 'react'
import "../assets/css/post.css"
import { Link } from 'react-router-dom'
export default function Post(props) {
  // console.log(props.data)  
  const url=process.env.REACT_APP_BACKEND_URL
// console.log(props.data.useravatar)  

  return (
    <div className='ps-cnt flexV'>
        <div className='flexCenter ps-m1'> 
        {props.data.useravatar===""? 
        <img src={require("../assets/images/gal.webp")} className='imgCover ps-us-im' alt=""/>:
            <img src={`${url}/media/${props.data.useravatar}`} className='imgCover ps-us-im' alt="" />
          }
         
            <Link to={`/users/${props.data.username}`} className='ps-f ps-m2'>
            {props.data.username}
            </Link>

        </div>
        <img src={`${url}${props.data.avatar}`} className="ps-im " alt="" />
      <div className='myFlex ps-f ps-m2'>
        {props.data.likes} Likes &emsp;{props.data.comments} Comments
      </div>

    </div>
  )
}
