import React, { useEffect, useRef } from 'react'
import userDefaulImage from '../assets/images/images.jpg';
import '../assets/css/profileDropDown.css';
import { BsSaveFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
// import ProfileDropDown from './ProfileDropDown';
const ProfileDropDown = ({ dropDownVisible, setDropDownVisible, profileDropDownRef }) => {
    const ref = useRef();
    const navigate = useNavigate();
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
    const handleLogout = (e) => {
        e.stopPropagation();
        navigate('/logout');
    }
    return (
        // <div>ProfileDropDown</div>
        <>
            <div className='profileDropDown' style={{ visibility: dropDownVisible ? 'visible' : 'hidden' }} ref={ref}>
                <div className='userProfileOption'>
                    <div className='userImage'>
                        <img src={userDefaulImage} alt='' />
                    </div>
                    <div className='userName'>
                        <h1>UserName</h1>
                    </div>

                </div>
                <div className='settingOption'>
                    <button className='firstbutton'><BsSaveFill style={{ fontSize: "2rem", marginBottom: "10px" }} />My Save</button>
                    <button>Followers</button>
                    <button>Following</button>
                    <button onClick={handleLogout}><FiLogOut style={{ fontSize: "2rem", marginBottom: "10px" }} />Log Out</button>

                </div>
            </div>
        </>
    )
}

export default ProfileDropDown