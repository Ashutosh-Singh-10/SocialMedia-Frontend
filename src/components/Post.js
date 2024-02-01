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
      <div className='flexCenter ps-m1' >
        {props.data.useravatar === "" ?
          <img src={require("../assets/images/gal.webp")} className='imgCover ps-us-im' alt="" /> :
          <img src={`${url}/media/${props.data.useravatar}`} className='imgCover ps-us-im' alt="" />
        }

        <Link to={`/users/${props.data.username}`} className='ps-f ps-m2' style={{ marginLeft: '10px' }}>
          {props.data.username} 
        </Link>

      </div>
      <div className='textS'>
      {props.data.desc}

      </div>
      <img src={`${props.data.avatar}`} className="ps-im " alt="" />
        {/* <d'iv style={{borderBottom:"1px solid black" }} className='ps-n-cn1'>
        &nbsp;
          {likes} likes {props.data.comments} comments
        </'div> */}


      <div className='ps-n-cn2 ps-f4 ps-m2' >
        <button className='LikesBtn' onClick={likePost}  >{likes} <span>
          {
            <svg width={40} height={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="black" fill='transparent' strokeWidth={1} strokeLinecap="round" strokeLinejoin="miter"><polygon points="7 9 11 2 14 2 13 9 22 9 20 22 7 22 7 9" fill={likeFlag ? '#EFB495' : 'white'} style={{ transitionProperty: 'all', transitionDuration: '0.5s' }} /><rect x={2} y={9} width={5} height={13} fill={likeFlag ? 'rgb(0, 183, 255)' : 'white'} style={{ transitionProperty: 'all', transitionDuration: '0.5s' }} /></svg>



          }

        </span></button> 
        
        <Link to={`/post/${props.data.id}`} className='CommentBtn'>{props.data.comments} <span style={{ display: 'flex', alignItems: 'center' }}>
          {/* <svg height={30} width={50} version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" space="preserve" fill="white">
            <path d="M92.574,294.24V124.336H43.277C19.449,124.336,0,144.213,0,168.467v206.44
		c0,24.254,19.449,44.133,43.277,44.133h62v45.469c0,3.041,1.824,5.777,4.559,6.932c2.736,1.154,5.957,0.486,8.023-1.641
		l49.844-50.76h106.494c23.828,0,43.279-19.879,43.279-44.133v-0.061H172.262C128.314,374.846,92.574,338.676,92.574,294.24z" />
            <path d="M462.717,40H172.26c-27.105,0-49.283,22.59-49.283,50.197v204.037c0,27.61,22.178,50.199,49.283,50.199
		h164.668l75.348,76.033c2.399,2.442,6.004,3.172,9.135,1.852c3.133-1.322,5.176-4.434,5.176-7.887v-69.998h36.131
		c27.106,0,49.283-22.59,49.283-50.199V90.197C512,62.59,489.822,40,462.717,40z M369.156,280.115H195.92v-24.316h173.236V280.115z
		 M439.058,204.129H195.92v-24.314h243.138V204.129z M439.058,128.143H195.92v-24.315h243.138V128.143z" />
          </svg> */}

          

<svg
  width={42}
  height={33}
  viewBox="0 0 42 33"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <path
    d="M0.753601 0.313629H41.5646V32.8586H0.753601V0.313629Z"
    fill="url(#pattern0)"
  />
  <defs>
    <pattern
      id="pattern0"
      patternContentUnits="objectBoundingBox"
      width={1}
      height={1}
    >
      <use
        xlinkHref="#image0_26_22"
        transform="matrix(0.00155753 0 0 0.00195312 0.101272 0)"
      />
    </pattern>
    <image
      id="image0_26_22"
      width={512}
      height={512}
      xlinkHref="data:image/png;base64,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"
    />
  </defs>
</svg>





        </span>
        </Link>

     

        {/* <img src={require("../assets/images/postIcons/share-arrow 1.jpg")} alt="" /> */}
        {<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 64 64"
  id="share"
  stroke="black"
  strokeWidth={1}
  height={33}
>
  <path
    fill="#222"
    d="M6.54 55.08a1.91 1.91 0 0 1-.62-.1 2 2 0 0 1-1.38-2c0-.3 2.06-29.34 31.18-31.62V10.92a2 2 0 0 1 3.43-1.4l19.74 20.16a2 2 0 0 1 0 2.8L39.15 52.64a2 2 0 0 1-3.43-1.4V41c-19.44.74-27.41 13-27.49 13.15a2 2 0 0 1-1.69.93Zm33.18-39.26v7.41a2 2 0 0 1-1.93 2c-18.84.69-25.58 13.24-28 21.31 5-4.32 13.91-9.6 27.81-9.6h.09a2 2 0 0 1 2 2v7.41l15-15.26Z"
    data-name="Arrow"
    // style={{ strokeWidth: 0.1 }}
  />
</svg>

          }

      </div>






{/* 
      <div className='myFlex   alignC'>
        {props.data.useravatar === "" ?
          <img src={require("../assets/images/gal.webp")} className='imgCover ps-us-im2' alt="" /> :
          <img src={`${url}/media/${props.data.useravatar}`} className='imgCover ps-us-im2' alt="" />
        }
        <div className='textS ps-m2 ps-m1' style={{ marginLeft: '10px' }}>

     
        
        </div>


      </div> */}



{/*       
      <div className='textS ps-m2 ps-m1' style={{ marginLeft: '10px' }}>

        <Link to={`/post/${props.data.id}`} className='ps-f3'>
          {props.data.comments > 0 ? `View all ${props.data.comments} comments` : `Be first one to comment`}
        </Link>



      </div> */}

    </div>
  )
}
