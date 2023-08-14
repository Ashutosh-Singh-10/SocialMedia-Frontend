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
  // const [comment, setComment] = useState("fdjj");
  const url = process.env.REACT_APP_BACKEND_URL;
  // const [liked, setLiked] = useState(0)
  const [isNextPage, setIsNextPage] = useState(1);

  const ref = useRef();
  const postdetailRef = useRef();
  const backButtonRef = useRef();
  const postDetailBgRef = useRef();
  const navigate = useNavigate();
  let token = Cook("access");
  console.log(token);
  const handleClick = (e) => {
    e.stopPropagation();
    navigate(-1);
  }
  const { data: postData } = useQuery(['post', postId], async () => {
    const url1 = url + "/feeds/id/" + postId;
    return axios.get(url1);
  }, {
    cacheTime: 86400000
  })
  // console.log(postData?.data);

  const { data: postComments, isLoading: commentsLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(['comments', postId], async ({ pageParam = 0 }) => {
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
      // refetchOnWindowFocus: false,
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
  console.log(postComments?.pages)

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

  // const addComment = () => {
  //   const url3 = url + "/comments/add";
  //   console.log("Bearer" + token)
  //   axios
  //     .post(url3, {
  //       commentPost: postId,
  //       entry: comment

  //     },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token

  //         },
  //       }

  //     )
  //     .then((res) => {
  //       console.log(typeof (res.data))
  //       console.log("the data is", res.data)
  //       let data = [res.data];
  //       console.log(data)
  //       // setComments(data.concat(comments))
  //       // console.log(comments)

  //       // setComments(res.data);
  //     })
  //     .catch((err) => { });


  // }
  // const likePost = () => {
  //   let url4;
  //   if (liked == 0) {
  //     url4 = url + "/feeds/like";
  //   }
  //   else {
  //     url4 = url + "/feeds/unlike";

  //   }
  //   axios
  //     .post(url4, {
  //       postid: postId,
  //     },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token

  //         },
  //       }

  //     ).then((res) => {

  //       console.log(res)
  //       if (res.data) {

  //         setLiked(res.data.liked)
  //       }

  //     }

  //     )

  // }


  return (
    <div className="pp-cnt  flexCenter" ref={postDetailBgRef}>

      <div className="pp-bx w80 h90 myFlex" ref={postdetailRef}>
        <img src={`${url}${postData?.data.avatar}`} className="pp-im2" alt="" />
        <div className="w40 h100">
          <div className="h8 myFlex pp-bd-b">
            <img className="pp-im3" src={`${url}/media/${postData?.data.useravatar}`} />
            <Link to={`/users/${postData?.data.username}`} className="flexCenter pp-ul">
              {postData?.data.username}
            </Link>
          </div>
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
                  <Fragment key={pageId}>{
                    // console.log(page.data.feeds)
                    page?.comments?.map((element, id) => {
                      return (
                        <>
                          <Comment data={element} key={id} />
                        </>
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
          <div className="h15 pp-bd-b pp-bx2">
            {/* <div className="h33"><button onClick={likePost}>{liked == 1 ? "unlike" : "like"} </button></div> */}
            <div className="h33 flexV pp-d1">
              {postData?.data.likes} Likes&emsp;
              {postData?.data.comments} Comments
              <br />
              <div className="w100 myFlex pp-f1">
                3 days ago</div>
            </div>
            {/* <div className="myFlex">3days ago</div> */}
          </div>
          <div className="h5 flexCenter">
            {/* <input className="w85 h90 cm-in"
              onChange={(e) => { setComment(e.target.value) }}
              value={comment}
              placeholder="Add a comment" />

            <div className=" w15 flexCenter cm-cb" onClick={addComment}>
              comment


            </div> */}
          </div>
        </div>
      </div>
      <button onClick={handleClick} style={{ alignSelf: 'flex-start', marginTop: '7dvh' }} className="closeButton" ref={backButtonRef}><span className="Xline"></span></button>
    </div>
  );
}
