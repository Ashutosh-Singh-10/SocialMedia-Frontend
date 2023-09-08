import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import "../assets/css/userprofile.css"
import { Link, useNavigate, useParams, useResolvedPath } from 'react-router-dom'
import axios from "axios"
import Cook from '../utilities/GetCookie';

import Post from './Post';
import { ThreeCircles } from 'react-loader-spinner'
import "../assets/css/homeleft2.css"
import Cookies from 'universal-cookie';
const UsersProfile = () => {
    const url = process.env.REACT_APP_BACKEND_URL;
    const { userId } = useParams();
    console.log(userId);
    const navigate = useNavigate();
    const [isNextPage, setIsNextPage] = useState(1);
    const cookies = new Cookies();
    const SaveUserId = cookies.get('username', { path: '/' });
    let token = Cook("access");
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
    const startFollowing = () => {
        const url2 = url + "/follow/startFollowing"
        axios.post(url2,
            {
                "username": userId,

            },
            {
                headers: {
                    Authorization: "Bearer " + token

                },
            }


        ).then((res) => {
            console.log(res);
            refetchUserData();
            console.log("ho gya follow")
        }).catch((err) => {
            console.log(err);

        })
    }
    const stopFollowing = () => {
        const url2 = url + "/follow/unfollow"
        axios.post(url2,
            {
                "leader": userId,

            },
            {
                headers: {
                    Authorization: "Bearer " + token

                },
            }


        ).then((res) => {
            console.log(res)
            refetchUserData();
            console.log("ho gya unfollow")
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleClickOnEdit = (e) => {
        e.stopPropagation();
        navigate('/editUserDetail');
    }
    const { data: userData, isLoading: userLoading, refetch: refetchUserData } = useQuery(`${userId}`, () => {
        // const url1 = url + "/profile/userfeeds"
        // console.log('Jai');
        const url2 = url + "/profile/userprofile"
        return axios.post(url2,
            {
                "username": userId,

            },
            {
                headers: {
                    Authorization: "Bearer " + token

                },
            }


        )
    }, {
        cacheTime: 86400000,
        // refetchInterval: 2000
        // refetchOnWindowFocus: false,
    });
    const userName = userData?.data?.id;
    console.log(userData?.data);
    const { data: userPosts, isLoading: postLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(['userPosts', userId], async ({ pageParam = 0 }) => {
        const url1 = url + "/profile/userfeeds"
        // let url1 = process.env.REACT_APP_BACKEND_URL + "/feeds/page";

        const res = await axios.post(url1,
            {
                "username": userId,
                "page": pageParam
            }
        )
        // console.log(res.data)
        setIsNextPage(res.data.remaining)
        console.log(isNextPage);
        return res.data;
    },
        {
            cacheTime: 86400000,
            // refetchInterval: 2000,
            // refetchOnWindowFocus: false,
            enabled: !!userName,
            getNextPageParam: (_lastPage, pages) => {
                if (isNextPage === 1) {
                    console.log(isNextPage)
                    return pages.length;
                }
                else {
                    return undefined
                }
                // console.log(pages.length);
                // return pages.length + 1;

            }
        })
    console.log(userPosts?.pages);
    useEffect(() => {
        const onScroll = (e) => {
            const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
            // console.log(scrollTop);
            if (scrollHeight - scrollTop <= clientHeight * 1.5) {
                // console.log("ja")
                if (hasNextPage) {
                    // console.log("azad")
                    fetchNextPage();
                }
            }
        }
        // const scrollPost = document.querySelector('.scrollPost');
        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        }
    })

    if (userLoading) {
        return (<div className='loader'>
            <ThreeCircles
                height="100"
                width="100"
                // color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="black"
                innerCircleColor="black"
                middleCircleColor="black"
            />

        </div>

        )
    }
    return (

        <div className='flexVC'>
            <div className='uf-cnt'>

                <div className='userInfoBox hpr-mbx w30 '>
                    <div className="hpr-mcn1 flexVC">
                        <br /><br /><br /><br />
                        <div className='flexCenter'>

                            <img src={`${userData?.data.avatar}`} className="hpr-img" alt="" />
                        </div>
                        <div className='hpr-f1 hpr-in-bx'>

                            <div className='myFlex'>
                                <div className="hpr-de-fnt">&nbsp;</div>
                                {/* &nbsp; &ensp;&nbsp;&nbsp;&nbsp; */}
                                <div className='flexEnd'>
                                    {userData?.data.username}
                                </div>
                                <div className='hpr-de-fnt'>
                                    {userData?.data.degree < 3 ? userData?.data?.degree : 3}{userData.data.degree == 1 ? "st" : userData.data.degree == 2 ? "nd" : userData.data.degree == 3 ? "rd" : '+'}
                                </div>
                            </div>

                            {
                                (SaveUserId !== userId) ? <><button className='hpr-btn Middle-btn' onClick={startFollowing} style={{ display: userData?.data.isFollowing ? "none" : "block" }}>Follow</button>
                                    <button className='hpr-btn2 Middle-btn' onClick={stopFollowing} style={{ display: userData?.data.isFollowing ? "block" : "none" }}>Following</button></> :
                                    <button className='Edit-Button' onClick={handleClickOnEdit} >Edit Profile</button>
                            }


                        </div>
                        <hr className='w90' />
                        <div className='w85 hpr-f2'>
                            {userData?.data?.first_name + ' ' + userData?.data?.last_name}
                            {/* {userData?.data?.last_name} */}
                        </div>
                        <div className='w85 hpr-f2' style={{
                            fontSize: "0.8rem",
                            fontWeight: "200", marginTop: '5px'
                            // color:"grey"
                        }}>
                            {userData?.data?.desc}
                            {/* {userData?.data?.last_name} */}
                        </div>

                    </div>
                    <div className="hpr-mcn2 flexVC w100">
                        <div className="flexCenter w100 hpr-f2 hpr-bx1">

                            <div className="w33 ">{userData?.data?.feeds} Posts</div>

                            <div className="w33 hpr-l-bd">{userData?.data?.leader}         Followers</div>
                            <div className="w33 hpr-l-bd">{userData?.data?.follower} Following</div>

                        </div>
                        <div className="flexCenter w100 hpr-bx2">
                            {/* My Save */}

                        </div>
                    </div>

                </div>
                {/* <div className="uf-pr myFlex">
                    <div className='w40'>
                        <br />
                        <img src={`${url}${userData?.data.avatar}`} className='uf-pf-im' />

                        
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
                </div> */}

                {/* <button  onClick={getPosts}>get the data</button> */}

                <div className="uf-cn w80">

                    {(!postLoading && userPosts?.pages[0]?.feeds?.length == 0) ? <div style={{ backgroundColor: "red" }}>
                        No post to display
                    </div> : <div></div>}

                    {(postLoading) ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} >
                        <ThreeCircles
                            height="100"
                            width="100"
                            // color="#4fa94d"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="three-circles-rotating"
                            outerCircleColor="black"
                            innerCircleColor="black"
                            middleCircleColor="black"
                        />
                    </div> : userPosts?.pages?.map((page, pageId) => {

                        // console.log(page)
                        return (
                            <Fragment key={pageId}>{
                                // console.log(page.data.feeds)
                                page?.feeds?.map((element, id) => {
                                    return (
                                        <Link to={`/post/${element.id}`} className='uf-cd flexCenter' key={id} >
                                            <div className='uf-hover flexCenter'>{element.likes} likes</div>
                                            <img src={`${url}${element.avatar}`} className='uf-im' />
                                        </Link>
                                    )

                                })}
                            </Fragment>
                            // <Post data={element} i={id} key={id} className="bd-pst"/>       


                        );
                    })}





                </div>
            </div>



        </div>
    )
}

export default UsersProfile