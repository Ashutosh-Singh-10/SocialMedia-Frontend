import React from 'react'
import "../assets/css/comment.css"
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'
import { Fragment } from 'react'
import CommentReply from './CommentReply'
export default function Comment(props) {
  console.log(props)
  const [isNextPage, setIsNextPage] = useState(1);
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyInput, setReplyInput] = useState(false);
  const url = process.env.REACT_APP_BACKEND_URL
  const { data: commentReplyData, isLoading: commentsReplyLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(['commentsReply', props.data.id], async ({ pageParam = 0 }) => {
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
  const handleReplyShow = (e) => {
    e.stopPropagation();
    setReplyVisible(!replyVisible);
  }
  const handleReply = (e) => {
    e.stopPropagation();
    setReplyInput(!replyInput);
  }

  return (
    <div className='w100 myFlex'>
      <div className='w15 imageBox'>
        <img className="cm-im" src={`${url}/media/${props.data.avatar}`} alt="" />

      </div>
      <div className='w85'>
        <div className='cm-bx w100'>
          <span className='cm-us'>{props.data.username}</span>
          {/* <br /> */}
          <span className='comment'>
            {props.data.entry}
          </span>
          <span>
            {props.data.likes}
          </span>
          <button onClick={handleReply}>reply</button>
          <button onClick={handleReplyShow}>view reply({props.data.replies})</button>
          <div>

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
