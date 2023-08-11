import React, { useEffect, useRef } from 'react'
import '../assets/css/userSearch.css'
const UserSearch = ({ isVisible, setVisible }) => {
    const SearchRef = useRef(null);
    // const handleClick = (e) => {
    //     // setVisible(false);
    //     e.stopPropagation();
    //     e.preventDefault();
    //     console.log();
    //     console.log();
    //     if (e.target != SearchRef.current) {
    //         setVisible(false);
    //     }
    // }
    const handleClickOutside = (event) => {
        console.log('ha')
        if (SearchRef.current && !SearchRef.current.contains(event.target)) {
            setVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true)
        return (
            document.removeEventListener('mousedown', handleClickOutside, true)
        )
    })
    return (
        <>{isVisible && <section className='searchPopUp'  >
            <div className='SearchField' ref={SearchRef}>
                <input type='text' placeholder='Search' />
            </div>
        </section>}

        </>
    )
}

export default UserSearch