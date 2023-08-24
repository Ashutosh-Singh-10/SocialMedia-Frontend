import axios from 'axios';
import React from 'react'

const EditUserProfile = () => {
    const url = process.env.REACT_APP_BACKEND_URL;
    const url1 = url + '/profile/update';
    const handleUserProfileUpdate = (e) => {
        e.stopPropagation();
        const res = axios.post(url1, {

        })
    }
    return (
        <>
            <form onSubmit={handleUserProfileUpdate}>
                <input type="file" id="img" name="img" accept="image/*" />
                <input type='text' placeholder='First Name' />
                <input type='text' placeholder='Last Name' />
                <textarea rows={4} cols={30} />
                <input type='submit' placeholder='Submit' />
            </form>
        </>
    )
}

export default EditUserProfile