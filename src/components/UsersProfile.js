import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import "../assets/css/userprofile.css"
import { Link, useParams } from 'react-router-dom'
import axios from "axios"
import Post from './Post';
const UsersProfile = () => {
    const url = process.env.REACT_APP_BACKEND_URL;
    const { userId } = useParams();
    console.log(userId);
    // const getUserProfileData = async () => {
    //     const url1 = url + "/profile/userfeeds"
    //     const url2 = url + "/profile/userprofile"
    //     axios.post(url2,
    //         {
    //             "username": userId
    //         }
    //     ).then((res) => {


    //         setUser(res.data);
    //         console.log(res.data);
    //     })
    //     axios.post(url1,
    //         {
    //             "username": userId
    //         }
    //     ).then((res) => {


    //         setPosts(res.data);
    //         // console.log(this.state)
    //         console.log(res.data)
    //     })
    //     // console.log(window.scrollY);
    // }
    // useEffect(() => {
    //     // let userId = window.location.pathname.split('/').pop()
    //     // console.log(userId);
    //     getUserProfileData();
    // }, [userId])
    // useEffect(() => {
    //     const onScroll = (e) => {
    //         console.log(e.target.documentElement.scrollTop)
    //         localStorage.setItem('position', JSON.stringify(e.target.documentElement.scrollTop))
    //     }
    //     window.addEventListener("scroll", onScroll);

    //     return () => window.removeEventListener("scroll", onScroll);
    // })
    // const onScroll = (e) => {
    //     console.log(e.target.documentElement.scrollTop)
    // }
    const { data: userData } = useQuery(`${userId}`, () => {
        // const url1 = url + "/profile/userfeeds"
        // console.log('Jai');
        const url2 = url + "/profile/userprofile"
        return axios.post(url2,
            {
                "username": userId
            }
        )
    }, {
        cacheTime: 86400000,
    });
    const { data: userPosts } = useQuery('userPosts', () => {
        const url1 = url + "/profile/userfeeds"
        return axios.post(url1,
            {
                "username": userId
            }
        )
    })
    // console.log(user);
    return (

        <div className='flexVC'>
            <br />
            <div className='uf-cnt'>
                <div className="uf-pr myFlex">
                    <div className='w40'>
                        <br />
                        <img src={`${url}${userData?.data.avatar}`} className='uf-pf-im' />

                        {/* <img src={require("../assets/images/gal.webp")} className='uf-pf-img' alt="" /> */}
                        <br />
                        <br />
                    </div>
                    <div className='w60'>
                        <br />
                        <div className='myFlex uf-f1'>
                            {userData?.data.username}
                        </div>
                        <hr />
                        <div className='myFlex uf-f2'>
                            <div >123 Likes &emsp;&emsp;</div>

                            <div >23posts</div>


                        </div>

                        <div className='myFlex uf-f3'>
                            {userData?.data.first_name} {userData?.data.last_name}
                        </div>
                        <div className='uf-ds myFlex'>

                            {userData?.data.desc}
                        </div>
                        <Link to="" className='uf-lnk myFlex'>
                            {userData?.data.link}

                        </Link>

                    </div>
                </div>
                {/* <button  onClick={getPosts}>get the data</button> */}
                <hr className='w100' />
                <div className="uf-cn">
                    {userPosts?.data.map((element, id) => {
                        return (

                            // <Post data={element} i={id} key={id} className="bd-pst"/>       

                            <Link to={`/post/${element.id}`} className='uf-cd flexCenter' key={id} >
                                <div className='uf-hover flexCenter'>{element.likes} likes</div>
                                <img src={`${url}${element.avatar}`} className='uf-im' />
                            </Link>
                        );
                    })}




                </div>
            </div>



        </div>
    )
}

export default UsersProfile