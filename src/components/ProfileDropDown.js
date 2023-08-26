import React, { useEffect, useRef } from 'react'
import userDefaulImage from '../assets/images/images.jpg';
import '../assets/css/profileDropDown.css';
import { BsSaveFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { LuEdit2 } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import Cook from '../utilities/GetCookie';
import axios from 'axios';
import { useQuery } from 'react-query';
// import ProfileDropDown from './ProfileDropDown';
import Cookies from 'universal-cookie';
const url = process.env.REACT_APP_BACKEND_URL;
const ProfileDropDown = ({ dropDownVisible, setDropDownVisible, profileDropDownRef }) => {
    let token = Cook("access");
    const ref = useRef();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const userId = cookies.get('username', { path: '/' });
    useEffect(() => {
        const handler = (e) => {
            if (!ref.current.contains(e.target) && !profileDropDownRef.current.contains(e.target)) {
                setDropDownVisible(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => {
            document?.removeEventListener('mousedown', handler);
        }
    });
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
    console.log(userData)
    const handleLogout = (e) => {
        e.stopPropagation();
        navigate('/logout');
    }
    const handleClickOnUserName = (e) => {
        e.stopPropagation();
        setDropDownVisible(false);
        navigate(`/users/${userId}`);
    }
    const handleClickOnEditProfile = (e) => {
        e.stopPropagation();
        setDropDownVisible(false);
        navigate('/editUserDetail')
    }
    return (
        // <div>ProfileDropDown</div>
        <>
            <div className='profileDropDown' style={{ visibility: dropDownVisible ? 'visible' : 'hidden' }} ref={ref}>
                <div className='userProfileOption' onClick={handleClickOnUserName}>
                    <div className='userImage'>
                        <img src={userData?.data?.avatar} alt='' />
                    </div>
                    <div className='userName'>
                        <h1>{userData?.data?.username}</h1>
                    </div>

                </div>
                <div className='settingOption'>
                    <div className='middleButton'>
                        <button onClick={handleClickOnEditProfile}><LuEdit2 style={{ fontSize: "2rem", marginBottom: "10px" }} />Edit Profile</button>
                        <button><div style={{ fontSize: "2rem", marginBottom: "8px" }}>{userData?.data?.leader}</div>Followers</button>
                        <button><div style={{ fontSize: "2rem", marginBottom: "8px" }} >{userData?.data?.follower}</div>Following</button>
                    </div>

                    <div className='downButton'>
                        <button className='firstbutton'><BsSaveFill style={{ fontSize: "2rem", marginRight: "10px" }} />My Save</button>
                        <button onClick={handleLogout}><FiLogOut style={{ fontSize: "2rem", marginRight: "10px" }} />Log Out</button>
                    </div>


                </div>
            </div>
        </>
    )
}

export default ProfileDropDown