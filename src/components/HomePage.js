import React from 'react'
import { useState } from 'react';
import '../assets/css/home.css'
import { useInfiniteQuery, useQuery } from 'react-query'
import axios from "axios"
import Post from './Post';
import { ThreeCircles } from 'react-loader-spinner'
// import InfiniteScroll from 'react-infinite-scroll-component'
// import '../assets/css/home.css'

import { useEffect } from 'react';
import { Fragment } from 'react';
import Cook from '../utilities/GetCookie';
import { Link } from "react-router-dom";

const url = process.env.REACT_APP_BACKEND_URL;

// import HomePost from './HomePost';




const HomePage = () => {
    // const [activity, setActivity] = useState([]);
    // const getActivity = 
    // const [activity2, setActivity2] = useState([]);
    // const getActivity2 = 

    const { data: Activity1Data } = useQuery('Activity1', async () => {
        let token = Cook("access");
        let url1 = url + "/follow/recentfollowings";

        return await axios.post(url1, {},
            {
                headers: {
                    Authorization: "Bearer " + token

                },
            }
        )

    }, {
        cacheTime: 86400000,
        refetchOnWindowFocus: false
    })
    const { data: Activity2Data } = useQuery('Activity2', async () => {
        let token = Cook("access");
        let url1 = url + "/follow/recentfollowers";

        return await axios.post(url1, {},
            {
                headers: {
                    Authorization: "Bearer " + token

                },
            }
        );

    }, {
        cacheTime: 86400000,
        refetchOnWindowFocus: false
    })
    console.log(Activity1Data);
    console.log(Activity2Data);


    const getPosts = async ({ pageParam = 0 }) => {
        // const [position, setPosition] = useState(100)
        let token = Cook("access");



        let url1 = url + "/feeds/page";


        const res = await axios.post(url1, {
            page: pageParam
        }, {
            headers: {
                Authorization: "Bearer " + token

            },
        }

        )
        return res.data;

    }
    const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery('InfinitePosts', getPosts, {
        getNextPageParam: (_lastPage, pages) => {

            return pages.length;
        }
    })
    useEffect(() => {
        const onScroll = (e) => {
            const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;

            if (scrollHeight - scrollTop <= clientHeight * 1.5) {
                if (hasNextPage) {
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
    // console.log(data);

    // const [posts, setPosts] = useState({ page: 0, posts: [] })
    // const getPosts = () => {
    //     console.log("ho gya load")
    //     // console.log(this.state.page)
    //     // let url = process.env.REACT_APP_BACKEND_URL + "/feeds/page";

    //     console.log("something ");
    //     const { data, isLoading } = useQuery([posts.page, posts.posts], () => {
    //         // const url1 = url + "/profile/userfeeds"
    //         // console.log('Jai');
    //         let url = process.env.REACT_APP_BACKEND_URL + "/feeds/page";
    //         return axios.post(url,
    //             {
    //                 page: posts?.page
    //             }
    //         )
    //     }, {
    //         cacheTime: 86400000,
    //         // refetchInterval: 2000
    //     });
    //     let li = posts?.posts
    //     li = li.concat(data?.data)
    //     console.log("j");
    //     setPosts({ page: posts.page + 1, posts: li });
    //     console.log(data?.data);


    // }
    return (

        <div className='w100 flexCenter'>
            <div className='hm-mb '>




                <div className='hl-mbx'>
                    <div className="hl-mcn1 flexVC">
                        <div className='flexCenter'>
                            <img src={require("../assets/images/sheldon.png")} className="hl-img" alt="" />
                        </div>
                        <div className='hl-f1'>
                            Sheldon Cooper
                        </div>
                        <hr className='w90' />
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


                {/* <InfiniteScroll className=''
                    dataLength={posts?.posts?.length}
                    next={getPosts}
                    hasMore={true}
                // loader={<h4></h4>}
                > */}
                <div className='flexVC scrollPost'>
                    {data?.pages?.map((page, pageId) => {
                        // console.log(page);
                        return (
                            <Fragment key={pageId}>
                                {
                                    page?.map((element, id) => {
                                        return (
                                            < Post data={element} i={id} key={id} className="bd-pst" />

                                        )
                                    })
                                }
                            </Fragment>

                        );
                    })}


                    {<ThreeCircles
                        height="60"
                        width="60"
                        // color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor="black"
                        innerCircleColor="black"
                        middleCircleColor="black"
                    />}
                </div>
                {/* </InfiniteScroll> */}





                <div className='hr-mbx'>









                    <div className="hr-mcn1 flexVC w100">

                        <div className=" w100 hr-cn1">
                            &ensp;&ensp;&nbsp;
                            Recent Following

                        </div>

                        {Activity1Data?.data?.map((element, id) => {

                            return (
                                <Link to={`/users/${element?.username}`} className='w100 hr-cn2' key={id}>
                                    <img src={`${url}${element.avatar}`} className="hr-img" alt="" />
                                    <div>{element.username}</div>
                                </Link>


                            );
                        })}


                        {/* <div className='w100 hr-cn2'>
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
                        </div> */}

                    </div>
                    <br /><br />
                    <div className="hr-mcn1 flexVC w100">

                        <div className=" w100 hr-cn1">
                            &ensp;&ensp;&nbsp;
                            Recent Followers

                        </div>

                        {Activity2Data?.data?.map((element, id) => {

                            return (
                                <Link to={`/users/${element?.username}`} className='w100 hr-cn2' key={id}>
                                    <img src={`${url}${element.avatar}`} className="hr-img" alt="" />
                                    <div>{element.username}</div>
                                </Link>


                            );
                        })}
                        {/* <div className='w100 hr-cn2'>
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
                        </div> */}

                    </div>





                </div>
            </div>
        </div>
    )

}

export default HomePage