import axios from 'axios';
import '../assets/css/editUserProfile.css';
import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import Cookies from 'universal-cookie';
import Cook from '../utilities/GetCookie';
import { useState } from 'react';
// import { LuEdit2 } from 'react-icons/lu';
import defaultImage from '../assets/images/images.jpg';
import { useNavigate } from 'react-router-dom';



const EditUserProfile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [desc, setDesc] = useState("");
    const [avatar, setAvatar] = useState(defaultImage);
    const [currentAvatar, setCurrentAvatar] = useState(null);
    const [newAvatar, setNewAvatar] = useState(null);
    const [isAvatar, setIsAvatar] = useState(false);
    const [isDisable, setIsDisable] = useState(true);

    const url = process.env.REACT_APP_BACKEND_URL;
    const cookies = new Cookies();
    const userId = cookies.get('username', { path: '/' });
    let token = Cook("access");
    const url1 = url + '/profile/update';
    const { data: userData, refetch: refetchUserData, isFetching, isLoading } = useQuery(['updateProfile', userId], async () => {
        const url2 = url + "/profile/userprofile";
        const res = await axios.post(url2,
            {
                "username": userId,

            },
            {
                headers: {
                    Authorization: "Bearer " + token

                },
            }


        );
        if (res?.data) {
            setFirstName(res?.data?.first_name);
            setLastName(res?.data?.last_name);
            setDesc(res?.data?.desc);
            // setAvatar(res?.data?.avatar);
            setCurrentAvatar(res?.data?.avatar);
        }

        return res;
    }, {
        refetchOnWindowFocus: false
    });

    // useEffect(() => {
    //     const url2 = url + "/profile/userprofile";

    //     const getProfile = async () => {
    //         const res = await axios.post(url2,
    //             {
    //                 "username": userId,

    //             },
    //             {
    //                 headers: {
    //                     Authorization: "Bearer " + token

    //                 },
    //             }


    //         );
    //         console.log(res);
    //         setFirstName(res.data.first_name);
    //         setLastName(res.data.last_name);
    //         setDesc(res.data.desc);
    //         setCurrentAvatar(res.data.avatar);
    //         // setAvatar(res.data.avatar);
    //     }
    //     getProfile();


    // }, [firstName, lastName, desc, currentAvatar]);
    // console.log(data?.data);
    const handleEdit = (e) => {
        e.stopPropagation();
        // console.log('jai');
        setIsDisable(false);
        // setNewAvatar(null);
    }
    const handleInputfileChange = (e) => {
        e.stopPropagation();
        // console.log(e.target.files);
        if (e.target?.files?.length != 0) {
            setIsAvatar(true);
            setAvatar(e.target.files[0]);
            console.log(URL.createObjectURL(e.target.files[0]))
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setNewAvatar(imgUrl);
            // console.log(currentAvatar);
        }
        else {
            setAvatar(null);
            setIsAvatar(false);
        }
    }

    const handleUserProfileUpdate = (e) => {
        e.stopPropagation();
        e.preventDefault();
        // console.log('pressed');
        console.log({
            first_name: firstName,
            last_name: lastName,
            desc: desc,
            avatar: avatar,
            isAvatar: isAvatar
        });
        axios.post(url1, {
            first_name: firstName,
            last_name: lastName,
            desc: desc,
            avatar: avatar,
            isAvatar: isAvatar
        },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + token

                }
            }).then((res) => {
                console.log(res);
                refetchUserData();
                navigate(`/users/${userData?.data?.username}`);
            })

        // setCurrentAvatar(res?.data?.avatar);
        // setFirstName(res?.data?.first_name);
        // setLastName(res?.data?.last_name);
        // setDesc(res?.data?.desc);
        // setIsAvatar(false);

    }
    return (
        <>
            <div className='updateForm'>
                {
                    (isFetching || isLoading) ? 'loading....' : <form onSubmit={handleUserProfileUpdate} >
                        <div className='userProfilePic'>
                            <label htmlFor="img" className="file-upload">{newAvatar ? <img src={newAvatar} alt='' /> : <img src={currentAvatar} alt='' />}</label>
                            <input type="file" className='userProfile' id="img" name="img" accept="image/*" onChange={handleInputfileChange} disabled={isDisable} />
                        </div>



                        <div className='userNameInputs'>
                            <input type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isDisable} />
                            <input type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isDisable} />
                        </div>

                        <textarea rows={4} cols={30} value={desc} onChange={(e) => setDesc(e.target.value)} disabled={isDisable} />
                        <div className='updateFormButtons'>
                            <input type='submit' placeholder='Submit' className='profileUpdateSubmit' disabled={isDisable} />
                            <input type='button' onClick={handleEdit} value='Edit' className='EditButton' />
                        </div>

                    </form>
                }

            </div>

        </>
    )
}

export default EditUserProfile