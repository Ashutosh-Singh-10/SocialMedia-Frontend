import { useState } from 'react';
import axios from "axios"
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component'
import React, { Component } from 'react'

export default class Home extends Component {
  constructor(){
    super();
    this.state={page:0,posts:[]}
  }
  getPosts=()=>{
console.log(this.state.page)
    let url = process.env.REACT_APP_BACKEND_URL+  "/feeds/page";

    console.log("something ");
    
        axios.post(url,{
          page:this.state.page
        }
      ).then((res) => {
        let li=this.state.posts
        li=li.concat(res.data)
        this.setState({posts:li,page:this.state.page+1})
    
      })
    
      }
      componentDidMount(){
        this.getPosts()  
      }
      




  render() {
    return (
      <div>
               <InfiniteScroll
          dataLength={this.state.posts.length}
          next={this.getPosts}
          hasMore={true}
          // loader={<h4></h4>}
        >

      <div className='flexVC'>
        {this.state.posts.map((element,id) => {
          return (
            
            <Post data={element} i={id} key={id} className="bd-pst"/>       
            );
          })}

                    
</div>
                </InfiniteScroll>
        
{/* <button onClick={this.getPosts}>Get posts</button> */}
              </div>
    )
  }
}


// export default function Home() {

//   const authToken="";
//   let url="http://localhost:8000/feeds/page"
//   const[posts,setPosts]=useState([])


//   const getPosts=()=>{

// console.log("something ");

//     axios.post(url,{
//       page:1
//     }
//   ).then((res) => {

//     let li=posts
//     // let li=Array(res.data)
//     li=li.concat(res.data)
//     console.log(li)
//     setPosts(
//       li
//     )

//   })

//   }
  

  


//   return (
    
// <div className='flexVC'>
//       {posts.map((element,id) => {
//                 return (
                     
//    <Post data={element} i={id} key={id} className="bd-pst"/>       
//                         );
//                     })}

                    
// <button onClick={getPosts}>Get posts</button>
// </div>
//   )
// }
