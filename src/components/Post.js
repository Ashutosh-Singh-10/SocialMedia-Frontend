import React, { useEffect, useState } from 'react'
import "../assets/css/post.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cook from '../utilities/GetCookie';
let token = Cook("access");
export default function Post(props) {
  const [likes, setLikes] = useState(0);
  const [likeFlag, setLikeFlag] = useState(0);
  // const [comment, setComment] = useState(4)
  // console.log(props.comment);
  useEffect(() => {
    // console.log('jai');
    setLikes(props?.data?.likes);
    setLikeFlag(props?.data?.isLiked);
  }, [props.data.likes]);
  // console.log(likes);
  // console.log(likeFlag);
  // console.log(comment);
  // console.log(props.data)
  const url = process.env.REACT_APP_BACKEND_URL
  // console.log(props.data.useravatar)
  const likePost = () => {
    let url4;
    if (!likeFlag) {
      url4 = url + "/feeds/like";
    }
    else {
      url4 = url + "/feeds/unlike";

    }
    // console.log(url4)
    axios
      .post(url4, {
        postid: props?.data?.id,
      },
        {
          headers: {
            Authorization: "Bearer " + token

          },
        }

      ).then((res) => {

        // console.log(res)
        if (!likeFlag) {
          setLikes(likes + 1);
          setLikeFlag(!likeFlag);
        }
        else {
          setLikes(likes - 1);
          setLikeFlag(!likeFlag);
        }
        // if (!likeFlag) {
        //   console.log(likeFlag)
        //   setLikes(likes - 1);
        //   setLikeFlag(true);
        // }
        // else {
        //   console.log(likeFlag)
        //   setLikes(likes + 1);
        //   setLikeFlag(false);
        // }

        // setLiked(!liked);
        // refetchPostData();
        // if (res.data) {
        // setLiked(res.data.liked)
        // }
        // console.log(liked)

      }


      )

  }


  return (
    <div className='ps-cnt flexV'
    // style={{backgroundColor:"rgb(190,80,70)",borderRadius:"10px",padding:"25px 0px"}}
    >
      <div className='flexCenter ps-m1' style={{ marginLeft: '10px' }}>
        {props.data.useravatar === "" ?
          <img src={require("../assets/images/gal.webp")} className='imgCover ps-us-im' alt="" /> :
          <img src={`${url}/media/${props.data.useravatar}`} className='imgCover ps-us-im' alt="" />
        }

        <Link to={`/users/${props.data.username}`} className='ps-f ps-m2' style={{ marginLeft: '10px' }}>
          {props.data.username}
        </Link>

      </div>
      <img src={`${props.data.avatar}`} className="ps-im " alt="" />
      <div className='myFlex ps-f4 ps-m2' style={{ marginLeft: '10px' }}>
        <button className='LikesBtn' onClick={likePost}  >{likes} <span>
          {
            <svg width={40} height={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="black" fill='transparent' strokeWidth={1} strokeLinecap="round" strokeLinejoin="miter"><polygon points="7 9 11 2 14 2 13 9 22 9 20 22 7 22 7 9" fill={likeFlag ? '#EFB495' : 'white'} style={{ transitionProperty: 'all', transitionDuration: '0.5s' }} /><rect x={2} y={9} width={5} height={13} fill={likeFlag ? 'rgb(0, 183, 255)' : 'white'} style={{ transitionProperty: 'all', transitionDuration: '0.5s' }} /></svg>



          }

        </span></button> &emsp;<Link to={`/post/${props.data.id}`} className='CommentBtn'>{props.data.comments} <span style={{ display: 'flex', alignItems: 'center' }}>
          <svg height={30} width={50} version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" space="preserve" fill="white">
            <path d="M92.574,294.24V124.336H43.277C19.449,124.336,0,144.213,0,168.467v206.44
		c0,24.254,19.449,44.133,43.277,44.133h62v45.469c0,3.041,1.824,5.777,4.559,6.932c2.736,1.154,5.957,0.486,8.023-1.641
		l49.844-50.76h106.494c23.828,0,43.279-19.879,43.279-44.133v-0.061H172.262C128.314,374.846,92.574,338.676,92.574,294.24z" />
            <path d="M462.717,40H172.26c-27.105,0-49.283,22.59-49.283,50.197v204.037c0,27.61,22.178,50.199,49.283,50.199
		h164.668l75.348,76.033c2.399,2.442,6.004,3.172,9.135,1.852c3.133-1.322,5.176-4.434,5.176-7.887v-69.998h36.131
		c27.106,0,49.283-22.59,49.283-50.199V90.197C512,62.59,489.822,40,462.717,40z M369.156,280.115H195.92v-24.316h173.236V280.115z
		 M439.058,204.129H195.92v-24.314h243.138V204.129z M439.058,128.143H195.92v-24.315h243.138V128.143z" />
          </svg>

        </span></Link>
      </div>
      <div className='myFlex   alignC'>
        {/* {props.data.useravatar === "" ?
          <img src={require("../assets/images/gal.webp")} className='imgCover ps-us-im2' alt="" /> :
          <img src={`${url}/media/${props.data.useravatar}`} className='imgCover ps-us-im2' alt="" />
        } */}
        <div className='textS ps-m2 ps-m1' style={{ marginLeft: '10px' }}>

          <Link to={`/users/${props.data.username}`} className='ps-f'>
            {props.data.username}
          </Link>
          <span className='ps-f2'> &nbsp;&nbsp;
            {props.data.desc}</span>
        </div>


      </div>
      <div className='textS ps-m2 ps-m1' style={{ marginLeft: '10px' }}>

        <Link to={`/post/${props.data.id}`} className='ps-f3'>
          {props.data.comments > 0 ? `View all ${props.data.comments} comments` : `Be first one to comment`}
        </Link>



      </div>

    </div>
  )
}
