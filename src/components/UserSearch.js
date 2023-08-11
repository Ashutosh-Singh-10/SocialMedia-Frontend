import React, { useEffect, useRef, useState } from 'react'
import '../assets/css/userSearch.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import useDebounce from '../hooks/useDebounce';
import { Link } from 'react-router-dom';
const UserSearch = ({ isVisible, setVisible }) => {
    const url = process.env.REACT_APP_BACKEND_URL
    const url1 = url + "/profile/search";
    const [searchText, setSearchText] = useState('');
    const [userProfile, setUserProfile] = useState(null);
    const debounceSearch = useDebounce(searchText, 1000);
    const { data, isLoading } = useQuery(['search', debounceSearch], () => {
        return axios.post(url1, {
            'username': debounceSearch
        })
    });
    // if (isLoading) {
    //     return (
    //         <h1>Loading</h1>
    //     )
    // }
    console.log(data);
    // const search = () => {

    // }
    const handleSearch = (e) => {
        e.stopPropagation();
        setSearchText(e.target.value);
        // search();
    }


    return (
        <>{isVisible && <section className='searchPopUp'  >
            <div className='SearchField' >
                <input type='text' value={searchText} onChange={handleSearch} placeholder='Search' />
                <div className='searchResult'>
                    {data?.data.map((element, id) => {
                        return (<><Link to={`/users/${element.username}`} className='searchUserLink'>
                            <img src={`${url}${element.avatar}`} className='searchUserPic' />
                            <div className='searchUserName'>
                                <h3 className='h1'>{element.username.slice(0, 20)}</h3>
                                <h4>{element.first_name + " " + element.last_name}</h4>
                            </div>

                        </Link>
                        </>)
                    })}

                </div>
            </div>
        </section>}

        </>
    )
}

export default UserSearch