import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { useInfiniteQuery } from 'react-query';
import '../assets/css/commentReply.css';
import { Link } from 'react-router-dom';

const CommentReply = ({ replyElement }) => {
    const url = process.env.REACT_APP_BACKEND_URL
    console.log(replyElement);

    return (
        <div className='commentReply'>
            <div className=' replyUserImg'>
                <img className="replyUserpic" src={`${url}/media/${replyElement.avatar}`} alt="" />
            </div>
            <div className='commentReplybx'>
                <Link className='replyUserName' to={`/users/${replyElement.username}`}>{replyElement.username}</Link>
                <div className='replyEntery'>{replyElement.entry}</div>

            </div>



        </div>

    )
}

export default CommentReply