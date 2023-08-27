import React, { useEffect } from 'react'
import "../assets/css/comment.css"
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'
import { Fragment } from 'react'
import CommentReply from './CommentReply'
import { Link } from 'react-router-dom'
export default function Comment(props) {
  console.log(props)

  const [isNextPage, setIsNextPage] = useState(1);
  const [replyVisible, setReplyVisible] = useState(false);

  const url = process.env.REACT_APP_BACKEND_URL
  const { data: commentReplyData, isLoading: commentsReplyLoading, isFetching, fetchNextPage, hasNextPage, refetch: replyRefetch } = useInfiniteQuery(['commentsReply', props.data.id], async ({ pageParam = 0 }) => {
    // const url1 = url + "/profile/userfeeds"
    // let url1 = process.env.REACT_APP_BACKEND_URL + "/feeds/page";
    const url2 = url + "/comments/getreply";
    const res = await axios.post(url2,
      {
        "commentId": props.data.id,
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
  // props.replyFetch = () => {

  // }
  // const reply = () => {
  //   return replyRefetch();
  // }
  // useEffect(() => {
  //   props.replyFetch(reply());
  // }, [])
  if (props.btnClick) {
    console.log('button clicked')
    replyRefetch();
    props.setBtnClicked(false);
  }
  const handleReplyShow = (e) => {
    e.stopPropagation();
    if (replyVisible) {
      setReplyVisible(false);
    }
    else {
      replyRefetch();
      setReplyVisible(true);
    }


  }
  const handleReply = (e) => {
    e.stopPropagation();
    props.setReplyInput(true);
    props.setCommentId(props.data.id)
    props.setReplyUserData({ username: props.data.username, entry: props.data.entry });
  }
  const handleClick = (e) => {
    e.stopPropagation();
    fetchNextPage();
  }

  return (
    <div className='w100 myFlex'>
      <div className='w15 imageBox'>
        <img className="cm-im" src={`${url}/media/${props.data.avatar}`} alt="" />

      </div>
      <div className='w85'>
        <div className='cm-bx w100'>
          <div className='commentBxLike'>
            <div className='usernameCm'>
              <Link className='cm-us commentUserName' to={`/users/${props.data.username}`}>{props.data.username}</Link>
              {/* <br /> */}
              <span className='comment'>
                {props.data.entry}
              </span>
            </div>

            {/* <span className='commentLikes'>
              {props.data.likes}
            </span> */}
          </div>
          <div className='replyButton'>
            <button onClick={handleReply} >Reply</button>
            <button onClick={handleReplyShow}>{replyVisible ? 'Hide Reply' : 'View Reply'}({props.data.replies})</button>
          </div>

          <div className='replies' >

            {replyVisible && commentReplyData?.pages?.map((page, pageId) => {
              console.log(page);
              return (
                <Fragment key={pageId}>
                  {
                    page?.commentsReply?.map((element, id) => {
                      return (<>
                        {/* <h1>jai</h1> */}
                        <CommentReply replyElement={element} key={id} />

                      </>)
                    })
                  }

                </Fragment>
              )
            })}
            {
              hasNextPage && <button className='viewMoreReply' onClick={handleClick} style={{ display: !replyVisible && 'none' }}>View More</button>
            }

          </div>

          {/* {replyInput && <div>
            <input type='text' placeholder='reply' />
          </div>
          } */}

        </div>
      </div>


    </div>
  )
}
