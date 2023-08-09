import { useState } from 'react';
import axios from "axios"
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component'
import React, { Component } from 'react'
import '../assets/css/home.css'

export default class Home extends Component {
  constructor(){
    super();
    this.state={page:0,posts:[]}
  }
  getPosts=()=>{
    console.log("ho gya load")
console.log(this.state.page)
    let url = process.env.REACT_APP_BACKEND_URL+  "/feeds/page";

    console.log("something ");
    
        axios.post(url,{
          page:this.state.page
        }
      ).then((res) => {
        let li = this.state.posts
        // console.log(res.data);
        li=li.concat(res.data)
        this.setState({posts:li,page:this.state.page+1})
    
      })
    
      }
      componentDidMount(){
        this.getPosts()  
  }
  
      




  render() {
    return (
      <div className='w100 flexCenter'>
<div className='hm-mb '>




<div className='hl-mbx'>
      <div className="hl-mcn1 flexVC">
        <div className='flexCenter'>
        <img src={require("../assets/images/sheldon.png")}  className="hl-img" alt="" />
        </div>
        <div className='hl-f1'>
           Sheldon Cooper
        </div>
        <hr className='w90'/>
        <div className='w85 hl-f2'> 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolorem sequi animi officiis fugiat quis aut consequatur tempore eos fuga numquam consequuntur nam unde laboriosam sunt velit magnam in amet enim consectetur, quaerat, maiores beatae nemo. Necessitatibus perspiciatis assumenda in!
        </div>

      </div>
      <div className="hl-mcn2 flexVC w100">
        <div className="flexCenter w100 hl-f2 hl-bx1">

        <div className="w33 ">24 Posts</div>
        <div className="w33 hl-l-bd">100 Followers</div>
        <div className="w33 hl-l-bd">100 Following</div>
          
        </div>
        <div className="flexCenter w100 hl-bx2">
          My Save
          
          </div>
      </div>

    </div>
               
               
               <InfiniteScroll className=''
          dataLength={this.state.posts.length}
          next={this.getPosts}
          hasMore={true}
          // loader={<h4></h4>}
        >

      <div className='flexVC'>
              {this.state.posts.map((element, id) => {
          console.log(element)
          return (
            <Post data={element} i={id} key={id} className="bd-pst"/>       
            );
          })}

                    
</div>
              </InfiniteScroll>





              <div className='hr-mbx'>








    
<div className="hr-mcn1 flexVC w100">

  <div className=" w100 hr-cn1">
    &ensp;&ensp;&nbsp;  
    Recent Following
    
    </div>
    <div className='w100 hr-cn2'>
        <img src={require("../assets/images/gal.webp")} className="hr-img" alt="" />
        <div>gal_godot-1</div>
    </div>
    <div className='w100 hr-cn2'>
        <img src={require("../assets/images/gal.webp")} className="hr-img" alt="" />
        <div>gal_godot-1</div>
    </div>
    <div className='w100 hr-cn2'>
        <img src={require("../assets/images/gal.webp")} className="hr-img" alt="" />
        <div>gal_godot-1</div>
    </div>
    <div className='w100 hr-cn2'>
        <img src={require("../assets/images/gal.webp")} className="hr-img" alt="" />
        <div>gal_godot-1</div>
    </div>
    
</div>
<br /><br />
<div className="hr-mcn1 flexVC w100">

  <div className=" w100 hr-cn1">
  &ensp;&ensp;&nbsp;  
    Recent Followers
    
    </div>
    <div className='w100 hr-cn2'>
        <img src={require("../assets/images/gal.webp")} className="hr-img" alt="" />
        <div>gal_godot-1</div>
    </div>
    <div className='w100 hr-cn2'>
        <img src={require("../assets/images/gal.webp")} className="hr-img" alt="" />
        <div>gal_godot-1</div>
    </div>
    <div className='w100 hr-cn2'>
        <img src={require("../assets/images/gal.webp")} className="hr-img" alt="" />
        <div>gal_godot-1</div>
    </div>
    <div className='w100 hr-cn2'>
        <img src={require("../assets/images/gal.webp")} className="hr-img" alt="" />
        <div>gal_godot-1</div>
    </div>
    
</div>





</div>
              </div>
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
