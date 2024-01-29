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

<svg
  width={32}
  height={23}
  viewBox="0 0 32 23"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <rect
    x="0.944351"
    y="0.737808"
    width="30.9174"
    height="21.6967"
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
        xlinkHref="#image0_26_23"
        transform="matrix(0.00137063 0 0 0.00195312 0.149119 0)"
      />
    </pattern>
    <image
      id="image0_26_23"
      width={512}
      height={512}
      xlinkHref="data:image/png;base64,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"
    />
  </defs>
</svg>


<img src={require("../assets/images/postIcons/share-arrow 1.svg")}/>


        </span>
        </Link>

     

        <img src={require("../assets/images/postIcons/share-arrow 1.jpg")} alt="" />
        

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
