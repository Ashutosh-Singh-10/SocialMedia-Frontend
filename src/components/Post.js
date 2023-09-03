import React from 'react'
import "../assets/css/post.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cook from '../utilities/GetCookie';
export default function Post(props) {

  console.log(props.data)
  const url = process.env.REACT_APP_BACKEND_URL
  // console.log(props.data.useravatar)

  return (
    <div className='ps-cnt flexV'>
      <div className='flexCenter ps-m1'>
        {props.data.useravatar === "" ?
          <img src={require("../assets/images/gal.webp")} className='imgCover ps-us-im' alt="" /> :
          <img src={`${url}/media/${props.data.useravatar}`} className='imgCover ps-us-im' alt="" />
        }

        <Link to={`/users/${props.data.username}`} className='ps-f ps-m2'>
          {props.data.username}
        </Link>

      </div>
      <img src={`${props.data.avatar}`} className="ps-im " alt="" />
      <div className='myFlex ps-f4 ps-m2'>
        <span className='LikesBtn' >{props.data.likes} Likes</span> &emsp;<Link to={`/post/${props.data.id}`} className='CommentBtn'>{props.data.comments} Comments</Link>
      </div>
      <div className='myFlex   alignC'>
        {/* {props.data.useravatar === "" ?
          <img src={require("../assets/images/gal.webp")} className='imgCover ps-us-im2' alt="" /> :
          <img src={`${url}/media/${props.data.useravatar}`} className='imgCover ps-us-im2' alt="" />
        } */}
        <div className='textS ps-m2 ps-m1'>

          <Link to={`/users/${props.data.username}`} className='ps-f'>
            {props.data.username}
          </Link>
          <span className='ps-f2'> &nbsp;&nbsp;
            {props.data.desc}</span>
        </div>


      </div>
      <div className='textS ps-m2 ps-m1'>

        <Link to={`/post/${props.data.id}`} className='ps-f3'>
          {props.data.comments > 0 ? `View all ${props.data.comments} comments` : `Be first one to comment`}
        </Link>



      </div>

    </div>
  )
}
