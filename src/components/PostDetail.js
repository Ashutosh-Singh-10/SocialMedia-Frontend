import React, { Fragment, useRef, useState } from "react";
import "../assets/css/postdetail.css";
import "../assets/css/comment.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import Cook from "../utilities/GetCookie.js";
import { useInfiniteQuery, useQuery } from "react-query";
import { ThreeCircles } from "react-loader-spinner";
export default function PostDetail() {

  const { postId } = useParams();
  // const [data, setData] = useState({});
  // const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [noComment, setNoComment] = useState(0);
  const url = process.env.REACT_APP_BACKEND_URL;
  const [liked, setLiked] = useState(true);
  const [isNextPage, setIsNextPage] = useState(1);
  const [replyInput, setReplyInput] = useState(false);
  const [replyUserData, setReplyUserData] = useState({});
  const [commentId, setCommentId] = useState(null);
  const [btnClick, setBtnClicked] = useState(false);
  // const [refetch, setRefetch] = useState(null);
  const ref = useRef();
  const postdetailRef = useRef();
  const backButtonRef = useRef();
  const postDetailBgRef = useRef();
  const navigate = useNavigate();
  let token = Cook("access");
  // console.log(token);
  const handleClick = (e) => {
    e.stopPropagation();
    navigate(-1);
  }
  // function replyFetch(replyfetch) {
  //   // console.log(replyfetch)
  //   console.log(typeof replyfetch);
  //   console.log(replyfetch);
  //   return replyfetch;
  // }
  // const ReplyRefetch = () => {
  //   replyFetch();
  // }
  const { data: postData, refetch: refetchPostData } = useQuery(['post', postId], async () => {
    const url1 = url + "/feeds/id/" + postId;
    return axios.post(url1,
      {
        "username": "kkjkdjk"
      },
      {
        headers: {
          Authorization: "Bearer " + token

        },
      })


  }, {
    cacheTime: 86400000
  })
  console.log(postData?.data);
  // setNoComment(postData?.data?.comments);

  const { data: postComments, isLoading: commentsLoading, isFetching, fetchNextPage, hasNextPage, refetch: refetchComment } = useInfiniteQuery(['comments', postId], async ({ pageParam = 0 }) => {
    // const url1 = url + "/profile/userfeeds"
    // let url1 = process.env.REACT_APP_BACKEND_URL + "/feeds/page";
    const url2 = url + "/comments/all";
    const res = await axios.post(url2,
      {
        "postId": postId,
        "page": pageParam
      }
    )
    // console.log(res.data)
    // setIsNextPage(res.data.remaining)
    // console.log(res);
    setIsNextPage(res.data.remaining)
    return res.data;
  },
    {
      // cacheTime: 86400000,
      // refetchInterval: 2000,
      refetchOnWindowFocus: false,
      // enabled: !!userName,
      getNextPageParam: (_lastPage, pages) => {
        if (isNextPage === 1) {
          // console.log(isNextPage)
          return pages.length;
        }
        else {
          return undefined
        }
        // console.log(pages.length);
        // return pages.length + 1;

      }
    })
  // console.log(postComments?.pages)

  useEffect(() => {
    const onScroll = (e) => {
      if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight * 1.5) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }
      // console.log(e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight);
    }
    // document.getElementById()
    // console.log(ref.current);
    ref.current.addEventListener('scroll', onScroll);
    return () => {
      // console.log(ref.current)
      ref.current?.removeEventListener('scroll', onScroll);
    }
  })
  useEffect(() => {
    const handler = (e) => {
      e.stopPropagation()
      if (!postdetailRef.current?.contains(e.target) && !backButtonRef.current.contains(e.target)) {
        navigate(-1);
      }
    }
    postDetailBgRef.current.addEventListener('mousedown', handler);
    return () => {
      postDetailBgRef.current?.removeEventListener('mousedown', handler);
    }
  })
  // useEffect(() => {
  //   const url1 = url + "/feeds/id/" + postId;
  //   const url2 = url + "/comments/all";
  //   axios
  //     .get(url1)
  //     .then((res) => {
  //       setData(res.data);
  //       console.log(res.data)
  //     })
  //     .catch((err) => { });
  //   axios
  //     .post(url2, {
  //       postId: postId,
  //     })
  //     .then((res) => {
  //       setComments(res.data);
  //     })
  //     .catch((err) => { });
  //   return () => { };
  // }, []);

  const addComment = () => {
    const url3 = url + "/comments/add";
    console.log("Bearer" + token)
    console.log(postId);
    console.log(comment);
    axios.post(url3, {
      commentPost: postId,
      entry: comment

    },
      {
        headers: {
          Authorization: "Bearer " + token

        },
      }

    )
      // console.log(res);
      .then((res) => {
        console.log(typeof (res.data))
        console.log("the data is", res.data)

        setComment('');
        // setNoComment(noComment => noComment + 1);
        refetchPostData();
        refetchComment();
        // let data = [res.data];
        // console.lsog(data)
        // setComments(data.concat(comments))
        // console.log(comments)

        // setComments(res.data);
      })
      .catch((err) => { console.log(err) });


  }
  const likePost = () => {
    let url4;
    if (!postData?.data?.isLiked) {
      url4 = url + "/feeds/like";
    }
    else {
      url4 = url + "/feeds/unlike";

    }
    console.log(url4)
    axios
      .post(url4, {
        postid: postId,
      },
        {
          headers: {
            Authorization: "Bearer " + token

          },
        }

      ).then((res) => {

        console.log(res)
        // setLiked(!liked);
        refetchPostData();
        // if (res.data) {
        // setLiked(res.data.liked)
        // }
        // console.log(liked)

      }


      )

  }
  const addReply = (e) => {
    e.stopPropagation();
    const url5 = url + "/comments/addreply";
    axios.post(url5, {
      commentOn: commentId,
      entry: comment

    },
      {
        headers: {
          Authorization: "Bearer " + token

        },
      }

    )
      .then((res) => {
        console.log(res)
        setComment('');
        // ReplyRefetch();
        setBtnClicked(true);
        refetchComment();
      })

  }
  const handleCloseReply = (e) => {
    e.stopPropagation();
    setReplyInput(!replyInput);
  }


  return (
    <div className="pp-cnt  flexCenter" ref={postDetailBgRef}>

      <div className=" w80 h90 myFlex pp-bx" ref={postdetailRef}>

        <img src={`${postData?.data.avatar}`} className="pp-im2" alt="" />

        <div className="w40 h100 pp-lbx">
          <div className="h8 myFlex pp-bd-b pp-bd-sp">
            <img className="pp-im3" src={`${url}/media/${postData?.data.useravatar}`} />
            <Link to={`/users/${postData?.data.username}`} className="flexCenter pp-ul">
              {postData?.data.username}
            </Link>
          </div>
          <img src={`${postData?.data.avatar}`} className="pp-im4" alt="" />
          <div className="h70 pp-bd-b scroll-y comment-section" ref={ref} >
            <div className="w100 myFlex">
              <div className="w15 ">
                <img
                  className="cm-im"
                  src={`${url}/media/${postData?.data.useravatar}`}
                  alt=""
                />
              </div>
              <div className="w85">
                <div className="cm-bx w100">
                  <span className="cm-us">{postData?.data.username}&nbsp;</span>
                  <span>{postData?.data.desc}</span>
                </div>
              </div>
            </div>

            {/* {comments.map((element, id) => {
              return <Comment data={element} key={id} />;
            })} */
              postComments?.pages?.map((page, pageId) => {
                console.log(page)
                return (
                  <Fragment key={pageId} >{
                    // console.log(page.data.feeds)
                    page?.comments?.map((element, id) => {
                      return (
                        <Comment data={element} setReplyInput={setReplyInput} replyInput={replyInput} setReplyUserData={setReplyUserData} setCommentId={setCommentId} btnClick={btnClick} setBtnClicked={setBtnClicked} key={id} />

                      )

                    })}
                  </Fragment>
                  // <Post data={element} i={id} key={id} className="bd-pst"/>       


                );
              })}
            {isFetching && <ThreeCircles
              height="60"
              width="60"
              // color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor="white"
              innerCircleColor="white"
              middleCircleColor="white"
            />}
          </div>
          <div className="h10 pp-bd-b pp-bx2">
            {/* <div className="h33"></div> */}
            <div className="h33 flexV pp-d1">
              <div className="postNumberOfLikeAndComment">
                <button onClick={likePost} style={{ display: 'flex', alignItems: 'flex-end', fontSize: '1.1rem' }}>{postData?.data?.likes} <svg width={40} height={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="black" fill='transparent' strokeWidth={1} strokeLinecap="round" strokeLinejoin="miter"><polygon points="7 9 11 2 14 2 13 9 22 9 20 22 7 22 7 9" fill={postData?.data?.isLiked ? '#EFB495' : 'white'} style={{ transitionProperty: 'all', transitionDuration: '0.5s' }} /><rect x={2} y={9} width={5} height={13} fill={postData?.data?.isLiked ? 'rgb(0, 183, 255)' : 'white'} style={{ transitionProperty: 'all', transitionDuration: '0.5s' }} /></svg> </button>
                {/* Likes&emsp; */}
                <span style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'flex-end' }}>
                  {postData?.data?.comments} <svg height={30} width={40} version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" space="preserve" fill="white">
                    <path d="M92.574,294.24V124.336H43.277C19.449,124.336,0,144.213,0,168.467v206.44
		c0,24.254,19.449,44.133,43.277,44.133h62v45.469c0,3.041,1.824,5.777,4.559,6.932c2.736,1.154,5.957,0.486,8.023-1.641
		l49.844-50.76h106.494c23.828,0,43.279-19.879,43.279-44.133v-0.061H172.262C128.314,374.846,92.574,338.676,92.574,294.24z" />
                    <path d="M462.717,40H172.26c-27.105,0-49.283,22.59-49.283,50.197v204.037c0,27.61,22.178,50.199,49.283,50.199
		h164.668l75.348,76.033c2.399,2.442,6.004,3.172,9.135,1.852c3.133-1.322,5.176-4.434,5.176-7.887v-69.998h36.131
		c27.106,0,49.283-22.59,49.283-50.199V90.197C512,62.59,489.822,40,462.717,40z M369.156,280.115H195.92v-24.316h173.236V280.115z
		 M439.058,204.129H195.92v-24.314h243.138V204.129z M439.058,128.143H195.92v-24.315h243.138V128.143z" />
                  </svg>
                </span>

                <br />
              </div>

              <div className="w100 myFlex pp-f1">
                3 days ago</div>
            </div>
            {/* <div className="myFlex">3days ago</div> */}
          </div>
          <div className=" AddCommentBox">
            <div className="h5 replyShowBox">
              {replyInput &&
                <><div>Replying To {replyUserData.username} </div> <button onClick={handleCloseReply}></button></>}
            </div>

            <div className=" flexCenter cm-cm-cnt">
              <input className="w80 h90 cm-in"
                onChange={(e) => { setComment(e.target.value) }}
                value={comment}
                placeholder={replyInput ? 'Add a Reply' : ' Add a Comment'} />

              <button className=" w20 flexCenter pp-cm-cb" onClick={replyInput ? addReply : addComment} disabled={(comment === '') ? true : false}>
                {replyInput ? 'Reply' : 'Comment'}


              </button>
            </div>

          </div>
        </div>
      </div>
      <button onClick={handleClick} style={{ alignSelf: 'flex-start', marginTop: '7dvh' }} className="closeButton" ref={backButtonRef}><span className="Xline"></span></button>
    </div>
  );
}
