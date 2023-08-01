import "../assets/css/userprofile.css"
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from "axios"
import Post from '../SocialMedia-Frontend/src/components/Post';

// import PostProfile from './PostProfile'

import React, { Component } from 'react'

export default class UserProfile extends Component {
    
    
    constructor()
    {
        super();
        
        this.state={
            url:process.env.REACT_APP_BACKEND_URL,
            posts:[],
            user:[]
        }
      
    }
    componentDidMount(){
        
        // console.log(this.props)
        let username = window.location.pathname.split('/').pop()
        // console.log(window.location.pathname);
        console.log(username)
        const url1=this.state.url+"/profile/userfeeds"
        const url2=this.state.url+"/profile/userprofile"
        
        axios.post(url2,
            {
                "username":username
            }
            ).then((res) => {
    
    
                this.setState({
                    user:res.data
                })
                console.log(this.state)
      })
        axios.post(url1,
            {
                "username":username
            }
            ).then((res) => {
    
    
                this.setState({
                    posts:res.data
                })
                console.log(this.state)
            })
            console.log(window.scrollY);
    }
  render() {
    return (
        <div className='flexVC'>
        <br />
        <div className='uf-cnt'>
            <div className="uf-pr myFlex">
                <div className='w40'>
                    <br />
                    <img src={`${this.state.url}${this.state.user.avatar}`} className='uf-pf-im'/> 

                {/* <img src={require("../assets/images/gal.webp")} className='uf-pf-img' alt="" /> */}
                <br />
                <br />
                </div>
                <div className='w60'>
                <br />
                    <div className='myFlex uf-f1'>
                        {this.state.user.username}
                    </div>
                        <hr  />
                    <div className='myFlex uf-f2'>
                        <div >123 Likes &emsp;&emsp;</div>
                        
                        <div >23posts</div>


                    </div>
                    
                    <div className='myFlex uf-f3'>
                        {this.state.user.first_name} {this.state.user.last_name}
                    </div>
                    <div className='uf-ds myFlex'>

                        {this.state.user.desc}
                    </div>
                        <Link to="" className='uf-lnk myFlex'>
                        {this.state.user.link}
                        
                        </Link>

                </div>
            </div>
            {/* <button  onClick={getPosts}>get the data</button> */}
            <hr className='w100'/>
            <div className="uf-cn">
            {this.state.posts.map((element,id) => {
                return (
                    
                    // <Post data={element} i={id} key={id} className="bd-pst"/>       

                    <Link to={`/post/${element.id}`} className='uf-cd flexCenter' key={id} >
                            <div className='uf-hover flexCenter'>{element.likes} likes</div>
                            <img src={`${this.state.url}${element.avatar}`} className='uf-im'/> 
                    </Link>
                );
            })}
                    

              

            </div>
        </div>



    </div>    )
  }
}




// export default function UserProfile() {

    
//     const[posts,setPosts]=useState([])
//     const url="http://localhost:8000"
    
    
    
//     useEffect=()=>{
        
        
//         const url="http://localhost:8000/profile/userfeeds"
        
//         axios.post(url,
//             {
//             "userid":1
//         }
//         ).then((res) => {
            
            
//             setPosts(
//                 res.data
//     )

//   })
//       }
    
//   return (
//     <div className='flexVC'>
//         <br />
//         <div className='uf-cnt'>
//             <div className="uf-pr myFlex">
//                 <div className='w40'>
//                     <br />
//                 <img src={require("../assets/images/gal.webp")} className='uf-pf-img' alt="" />
//                 <br />
//                 <br />
//                 </div>
//                 <div className='w60'>
//                 <br />
//                     <div className='myFlex uf-f1'>
//                         gal_gadot_10
//                     </div>
//                         <hr  />
//                     <div className='myFlex uf-f2'>
//                         <div >123 Likes &emsp;&emsp;</div>
                        
//                         <div >23posts</div>


//                     </div>
                    
//                     <div className='myFlex uf-f3'>
//                         Gal Godot
//                     </div>
//                     <div className='uf-ds myFlex'>
//                         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto animi, laborum dolorum quibusdam ratione consectetur porro obcaecati facere fugiat reiciendis.
//                     </div>
//                         <Link to="" className='uf-lnk myFlex'>
//                         http://fkdjl.com
//                         </Link>

//                 </div>
//             </div>
//             {/* <button  onClick={getPosts}>get the data</button> */}
//             <hr className='w100'/>
//             <div className="uf-cn">
//             {posts.map((element,id) => {
//                 return (
//                     // <Post data={element} i={id} key={id} className="bd-pst"/>       

//                     <Link to={`post/${element.id}`} className='uf-cd flexCenter' key={id} >
//                             <div className='uf-hover flexCenter'>{element.likes} likes</div>
//                             <img src={`${url}${element.avatar}`} className='uf-im'/> 
//                     </Link>
//                 );
//                 })}
                    

              

//             </div>
//         </div>



//     </div>
//   )
// }
