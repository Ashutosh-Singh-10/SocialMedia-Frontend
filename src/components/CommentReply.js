import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { useInfiniteQuery } from 'react-query';
import '../assets/css/commentReply.css';

const CommentReply = ({ replyElement }) => {
    const url = process.env.REACT_APP_BACKEND_URL
    console.log(replyElement);

    return (
        <div className='commentReply'>
            <div className=' replyUserImg'>
                <img className="replyUserpic" src={`${url}/media/${replyElement.avatar}`} alt="" />
            </div>
            <div className='commentReplybx'>
                <div className='replyUserName'>{replyElement.username}</div>
                <div className='replyEntery'>{replyElement.entry}</div>

            </div>



        </div>

    )
}

export default CommentReply