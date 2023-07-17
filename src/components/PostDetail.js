import React, { useState } from "react";
import "../assets/css/postdetail.css";
import "../assets/css/comment.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
export default function PostDetail() {
  const { postId } = useParams();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const [comment,setComment]=useState("fdjj");
  const url = "http://localhost:8000";
  const [liked,setLiked]=useState(0)

  useEffect(() => {
    const url = "http://localhost:8000/feeds/id/" + postId;
    const url2 = "http://localhost:8000/comments/all";
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        console.log(res.data)
      })
      .catch((err) => {});
    axios
      .post(url2, {
        postId: postId,
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {});
    return () => {};
  }, []);

  const addComment=()=>{
    const url3 = "http://localhost:8000/comments/add";
    const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5MjIzOTk3LCJpYXQiOjE2ODkxMzc1OTcsImp0aSI6IjVhNTlkMzYwODQ3MzQyYzI5M2QzMjJmNTQwMmRhZTMwIiwidXNlcl9pZCI6MX0.krXDcMYwLgp0HaacdtYMlEIbwJ2fs2Lc6Z85-dy060g"
    console.log("Bearer"+token)
    axios
    .post(url3, {
      commentPost: postId,
      entry:comment
      
    },
    {
      headers:{
        Authorization: "Bearer "+token

      },
    }
   
    )
    .then((res) => {
      console.log(typeof(res.data))
      console.log("the data is",res.data)
      let data=[res.data];
      console.log(data)
      setComments(data.concat(comments))
      console.log(comments)

      // setComments(res.data);
    })
    .catch((err) => {});


  }
  const likePost=()=>{
    let url;
    if(liked==0)
    {
      url="http://localhost:8000/feeds/like";
    }
    else
    {
      url="http://localhost:8000/feeds/unlike";
      
    }
        const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5NjcxMTMwLCJpYXQiOjE2ODk1ODQ3MzAsImp0aSI6IjllYTI1MTg1OTlkZTQ4YzM5ZGVmODMwNjdkOWFjZDdhIiwidXNlcl9pZCI6MX0.SIASatDOMBjaPVL1FirRyCYYY3Tx9gYuY1eZlEK0VO8"
        axios
        .post(url, {
          postid: postId,          
        },
        {
          headers:{
            Authorization: "Bearer "+token
    
          },
        }
       
        ).then((res)=>{
         
          console.log(res)
          if(res.data)
          {

            setLiked(res.data.liked)
          }
          
        }

        )

  }

  return (
    <div className="pp-cnt  flexCenter">
      <div className="pp-bx w80 h90 myFlex">
        <img src={`${url}${data.avatar}`} className="pp-im2" alt="" />
        <div className="w40 h100">
          <div className="h8 myFlex pp-bd-b">
            <img className="pp-im3" src={`${url}/media/${data.useravatar}`} />
            <Link to={`/users/${data.username}`} className="flexCenter pp-ul">
              {data.username}
            </Link>
          </div>
          <div className="h70 pp-bd-b scroll-y">
            <div className="w100 myFlex">
              <div className="w15 ">
                <img
                  className="cm-im"
                  src={`${url}/media/${data.useravatar}`}
                  alt=""
                />
              </div>
              <div className="w85">
                <div className="cm-bx w100">
                  <span className="cm-us">{data.username}&nbsp;</span>
                  <span>{data.desc}</span>
                </div>
              </div>
            </div>
            {comments.map((element, id) => {
              return <Comment data={element} key={id} />;
            })}
          </div>
          <div className="h15 pp-bd-b pp-bx2">
            <div className="h33"><button onClick={likePost}>{liked==1?"unlike":"like"} </button></div>
            <div className="h33 flexV pp-d1">
              {data.likes} Likes&emsp;
              {data.comments} Comments
              <br />
              <div className="w100 myFlex pp-f1">
                3 days ago</div>
            </div>
            {/* <div className="myFlex">3days ago</div> */}
          </div>
          <div className="h5 flexCenter">
            <input className="w85 h90 cm-in" 
             onChange={(e)=>{setComment(e.target.value)}} 
             value={comment}
             placeholder="Add a comment"/>
             
            <div className=" w15 flexCenter cm-cb" onClick={addComment}>
              comment

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
