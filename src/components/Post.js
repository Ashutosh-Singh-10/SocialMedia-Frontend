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




          {/* <svg
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
          </svg> */}

          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="gray" fill="white" stroke-width="2" stroke-linecap="round">
            <path d="M21.825 2.175c-2.287-2.286-6.01-2.286-8.296 0a9.3 9.3 0 0 0-8.296 8.297c0 4.192 3.408 7.6 7.6 7.6 1.992 0 3.84-.772 5.238-2.17l2.525 2.525a1 1 0 0 0 1.414 0c.391-.39.391-1.024 0-1.414l-2.524-2.525a9.284 9.284 0 0 0 2.17-5.238 9.3 9.3 0 0 0-8.297-8.296z" />
          </svg> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3a2.99 2.99 0 0 1 4.17-2.78 5 5 0 0 1 2.56 1.41 1 1 0 0 0 1.33.07 7 7 0 0 0 6.8 0 1 1 0 0 0 1.4-.1 5 5 0 0 1 7.23 1.74 2.99 2.99 0 0 1-2.78 4.17H3z" />
          </svg> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#000000">
            <circle cx="12" cy="12" r="11" stroke="black" stroke-width="2" fill="#ffffff" />
            <path d="M8 12l2 2 4-4" stroke="black" stroke-width="2" fill="none" />
          </svg> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#000000">
            <path d="M21 2H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4.414l2.293 2.293A1 1 0 0 0 10 20v-2h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm0 2v10H11.414L9.707 15.293a1 1 0 0 0-.707-.293H4V4h17z" fill="black" />
          </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" id="message" viewBox="0 0 32 32" style={{ marginTop: '10px', marginLeft: '5px' }}>
            <path d="M5.2 22c-.4 0-.9-.1-1.3-.2s-.6-.3-.8-.5l-.1-.1c-.1-.1-.2-.3-.2-.4 0-.2.1-.3.3-.4.8-.4 1.5-1.1 1.9-1.9 0-.1 0-.2.1-.3C2.3 16.5.7 13.8.7 11 .6 6 5.7 2 12 2c6.3 0 11.4 4 11.4 9s-5.1 9.1-11.4 9.1c-.6 0-1.3 0-1.9-.1-1.5 1.3-3.2 2-4.9 2zm-1-1.1c1.7.4 3.7-.3 5.5-1.8 0-.1.2-.2.3-.1.6.1 1.3.1 2 .1 5.7 0 10.4-3.6 10.4-8.1S17.7 3 12 3 1.6 6.6 1.6 11c0 2.6 1.6 5 4.3 6.5.2.1.3.4.2.6 0 .3-.1.6-.3.9-.4.8-1 1.4-1.6 1.9z" fill="white" stroke="grey" stroke-width="1" />
          </svg>








        </span>
        </Link>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} id="share" style={{ margin: '5px' }}>
          <path d="m23.665 8.253-9-8A.998.998 0 0 0 13 1v3.207C9.996 5.013 0 8.765 0 23a1 1 0 0 0 1.928.371c2.965-7.413 8.745-8.96 11.071-9.283V17a1 1 0 0 0 1.666.747l9-8a1 1 0 0 0 0-1.494z" fill='white' stroke='grey' strokeWidth='2' />
        </svg> */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="gray" fill="white" stroke-width="2" stroke-linecap="round">
          <path d="M23.665 8.253l-9-8a.998.998 0 0 0-1.666.747v3.207C9.996 5.013 0 8.765 0 23a1 1 0 0 0 1.928.371c2.965-7.413 8.745-8.96 11.071-9.283V17a1 1 0 0 0 1.666.747l9-8a1 1 0 0 0 0-1.494z" />
        </svg> */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 5a2 2 0 0 1-1 1.732V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9.268a2 2 0 0 1 1-1.732l3.707-.93a2 2 0 0 1 2.487 2.488l-.93 3.707z" />
        </svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="-5 -5 38 38" stroke="gray" fill="white" stroke-width="2" stroke-linecap="round" style={{ marginTop: '10px', marginRight: '15px' }}>
          <path d="M23.665 8.253l-9-8a.998.998 0 0 0-1.666.747v3.207C9.996 5.013 0 8.765 0 23a1 1 0 0 0 1.928.371c2.965-7.413 8.745-8.96 11.071-9.283V17a1 1 0 0 0 1.666.747l9-8a1 1 0 0 0 0-1.494z" >

          </path>
        </svg>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="gray" fill="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 9v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9L12 2l8 7zm-2 0v-8h-4v8h-4v-5H10v5H4V9L12 4l8 5z" />
        </svg> */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="32.25" height="32" viewBox="0 0 32.25 32" id="house" stroke="gray" fill="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1.624 17.782 4 15.882V30a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8h4v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V15.882l2.376 1.9a1 1 0 0 0 1.25-1.564l-15-12a1.001 1.001 0 0 0-1.25 0L10 8.518V6a2 2 0 0 0-4 0v5.718l-5.624 4.5c-.43.346-.5.974-.156 1.406a.998.998 0 0 0 1.404.158zM16 6.28l10 8V30h-6V20h-8v10H6V14.282L16 6.28z" />
        </svg> */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="gray" fill="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12l10-9 10 9-1.5 1.5-8.5-7.5-8.5 7.5z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="32.25" height="32" id="house"><path d="M1.624 17.782 4 15.882V30a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8h4v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V15.882l2.376 1.9a1 1 0 0 0 1.25-1.564l-15-12a1.001 1.001 0 0 0-1.25 0L10 8.518V6a2 2 0 0 0-4 0v5.718l-5.624 4.5c-.43.346-.5.974-.156 1.406a.998.998 0 0 0 1.404.158zM16 6.28l10 8V30h-6V20h-8v10H6V14.282L16 6.28z" fill='grey'></path></svg>

        <svg xmlns="http://www.w3.org/2000/svg" height={32} width={32} viewBox="0 0 16 16" id="explore"><path d="M8,16a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,8,16ZM8,1a7,7,0,1,0,7,7A7.00787,7.00787,0,0,0,8,1Z" fill='grey'></path><path d="M3.40381,13.09619a.50019.50019,0,0,1-.457-.70312L5.77539,6.0293a.49919.49919,0,0,1,.25391-.25391l6.36377-2.82861a.50024.50024,0,0,1,.66015.66015L10.22461,9.9707a.49919.49919,0,0,1-.25391.25391L3.60693,13.05322A.50264.50264,0,0,1,3.40381,13.09619ZM6.61133,6.61133l-2.22266,5,5-2.22266,2.22266-5Z" fill='grey'></path><path d="M8,8.99951A.99951.99951,0,1,1,8.707,8.707.99743.99743,0,0,1,8,8.99951Z" fill='grey'></path></svg>

        <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" id="save"><path fill="grey" d="M9.09,30a2.33,2.33,0,0,1-.74-.11,3.44,3.44,0,0,1-2.29-3.45V5.56A3.32,3.32,0,0,1,9.06,2H22.94a3.32,3.32,0,0,1,3,3.56V26.44a3.44,3.44,0,0,1-2.29,3.45,2.71,2.71,0,0,1-3.1-1.29L16,21.48,11.45,28.6A2.82,2.82,0,0,1,9.09,30ZM16,18.63a1,1,0,0,1,.84.46l5.39,8.43h0a.79.79,0,0,0,.86.45,1.48,1.48,0,0,0,.85-1.53V5.56c0-.92-.53-1.56-1-1.56H9.06c-.47,0-1,.64-1,1.56V26.44A1.48,1.48,0,0,0,8.91,28a.79.79,0,0,0,.86-.45l5.39-8.43A1,1,0,0,1,16,18.63Z"></path></svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          viewBox="0 0 24 24"
          id="setting"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="#200E32"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            transform="translate(2.5 1.5)"
          >
            <path d="M18.3066362,6.12356982 L17.6842106,5.04347829 C17.1576365,4.12955711 15.9906873,3.8142761 15.0755149,4.33867279 L15.0755149,4.33867279 C14.6398815,4.59529992 14.1200613,4.66810845 13.6306859,4.54104256 C13.1413105,4.41397667 12.7225749,4.09747295 12.4668193,3.66132725 C12.3022855,3.38410472 12.2138742,3.06835005 12.2105264,2.74599544 L12.2105264,2.74599544 C12.2253694,2.22917739 12.030389,1.72835784 11.6700024,1.3576252 C11.3096158,0.986892553 10.814514,0.777818938 10.2974829,0.778031878 L9.04347831,0.778031878 C8.53694532,0.778031878 8.05129106,0.97987004 7.69397811,1.33890085 C7.33666515,1.69793166 7.13715288,2.18454839 7.13958814,2.69107553 L7.13958814,2.69107553 C7.12457503,3.73688099 6.27245786,4.57676682 5.22654465,4.57665906 C4.90419003,4.57331126 4.58843537,4.48489995 4.31121284,4.32036615 L4.31121284,4.32036615 C3.39604054,3.79596946 2.22909131,4.11125048 1.70251717,5.02517165 L1.03432495,6.12356982 C0.508388616,7.03634945 0.819378585,8.20256183 1.72997713,8.73226549 L1.72997713,8.73226549 C2.32188101,9.07399614 2.68650982,9.70554694 2.68650982,10.3890161 C2.68650982,11.0724852 2.32188101,11.704036 1.72997713,12.0457667 L1.72997713,12.0457667 C0.820534984,12.5718952 0.509205679,13.7352837 1.03432495,14.645309 L1.03432495,14.645309 L1.6659039,15.7345539 C1.9126252,16.1797378 2.3265816,16.5082503 2.81617164,16.6473969 C3.30576167,16.7865435 3.83061824,16.7248517 4.27459956,16.4759726 L4.27459956,16.4759726 C4.71105863,16.2212969 5.23116727,16.1515203 5.71931837,16.2821523 C6.20746948,16.4127843 6.62321383,16.7330005 6.87414191,17.1716248 C7.03867571,17.4488473 7.12708702,17.764602 7.13043482,18.0869566 L7.13043482,18.0869566 C7.13043482,19.1435014 7.98693356,20.0000001 9.04347831,20.0000001 L10.2974829,20.0000001 C11.3504633,20.0000001 12.2054882,19.1490783 12.2105264,18.0961099 L12.2105264,18.0961099 C12.2080776,17.5879925 12.4088433,17.0999783 12.7681408,16.7406809 C13.1274382,16.3813834 13.6154524,16.1806176 14.1235699,16.1830664 C14.4451523,16.1916732 14.7596081,16.2797208 15.0389017,16.4393593 L15.0389017,16.4393593 C15.9516813,16.9652957 17.1178937,16.6543057 17.6475973,15.7437072 L17.6475973,15.7437072 L18.3066362,14.645309 C18.5617324,14.2074528 18.6317479,13.6859659 18.5011783,13.1963297 C18.3706086,12.7066935 18.0502282,12.2893121 17.6109841,12.0366133 L17.6109841,12.0366133 C17.17174,11.7839145 16.8513595,11.3665332 16.7207899,10.876897 C16.5902202,10.3872608 16.6602358,9.86577384 16.9153319,9.42791767 C17.0812195,9.13829096 17.3213574,8.89815312 17.6109841,8.73226549 L17.6109841,8.73226549 C18.5161253,8.20284891 18.8263873,7.04344892 18.3066362,6.13272314 L18.3066362,6.13272314 L18.3066362,6.12356982 Z" stroke='grey' />
            <circle cx="9.675" cy="10.389" r="2.636" stroke='grey' />
          </g>
        </svg>

        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg> */}
        <svg
          className="svg-icon"
          width={38}
          height={38}
          style={{
            verticalAlign: "middle",
            fill: "currentColor",
            overflow: "hidden"
          }}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M627.62 901.4H265.23c-56.91 0-103.05-46.14-103.05-103.05V262.8c0-56.91 46.14-103.05 103.05-103.05h362.38c56.91 0 103.04 46.13 103.04 103.04v34.78c0 15.26-12.37 27.63-27.63 27.63s-27.63-12.37-27.63-27.63V262.8c0-26.39-21.39-47.79-47.79-47.79H265.23c-26.39 0-47.78 21.39-47.78 47.78v535.57c0 26.39 21.39 47.77 47.77 47.77h362.39c26.39 0 47.77-21.39 47.77-47.77V769.6c0-15.26 12.37-27.63 27.63-27.63s27.63 12.37 27.63 27.63v28.76c0.02 56.91-46.12 103.04-103.02 103.04z" fill='grey' />
          <path d="M853.72 508.65L731.19 386.12c-10.79-10.79-28.29-10.79-39.08 0s-10.79 28.29 0 39.08l75.18 75.18 1.17 1.12h-301c-15.26 0-27.63 12.37-27.63 27.63s12.37 27.63 27.63 27.63h299.09l-83.76 83.76c-10.86 10.86-9.69 27.27 2.59 36.48 12.28 9.21 31.21 7.87 42.07-2.99l126.28-126.28c10.79-10.79 10.79-28.28-0.01-39.08z" fill='grey' />
        </svg>

        <svg
          className="svg-icon"
          width={30}
          height={30}
          style={{
            verticalAlign: "middle",
            fill: "currentColor",
            overflow: "hidden"
          }}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M904 64c30.9 0 56 25.1 56 56v784c0 30.9-25.1 56-56 56H120c-30.9 0-56-25.1-56-56V120c0-30.9 25.1-56 56-56h784m0-64H120C53.7 0 0 53.7 0 120v784c0 66.3 53.7 120 120 120h784c66.3 0 120-53.7 120-120V120c0-66.3-53.7-120-120-120z"
            fill="grey"
          />
          <path
            d="M736 480H288c-17.7 0-32 14.3-32 32s14.3 32 32 32h448c17.7 0 32-14.3 32-32s-14.3-32-32-32z"
            fill="grey"
          />
          <path
            d="M480 288v448c0 17.7 14.3 32 32 32s32-14.3 32-32V288c0-17.7-14.3-32-32-32s-32 14.3-32 32z"
            fill="grey"
          />
        </svg>















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
