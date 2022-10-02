import {Link, useOutletContext} from 'react-router-dom'
import { useState } from 'react';
import SearchBar from './Searchbar';
import { NavBarData } from './NavBarData';
import {AuthNavbarData} from './AuthNavbarData';



function NavBar ({setLat, setLng, currentUser, setCurrentUser, placeId, setPlaceId, storedLocations}) {
    const [clicked, setClicked] = useState(false)

    function showNavBar () {
        setClicked(!clicked)
    }

    function handleLogout (e) {
        e.preventDefault()
        fetch('/logout', {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                alert("You have sucessfully logged out.")
                setCurrentUser(null)
            }
        })
    }

    return (
        <div className='nav-container'>  
            <Link to='/' className='nav-logo'>
                Weather Watchers <i class="fa-solid fa-2x fa-cloud"></i>
            </Link>
            <SearchBar placeholder='search by zipcode' setLat={setLat} setLng={setLng} placeId={placeId} setPlaceId={setPlaceId} storedLocations={storedLocations} />
            {currentUser ? 
            <div className='account-widget'>
                <Link to='/my-account'>
                    <i class="fa-solid fa-user"></i>
                </Link>
            </div> : <></>}
            <div to='/' className='nav-icon'>
                <i class="fa-solid fa-2x fa-bars" onClick={showNavBar}></i>
            </div>
            <nav className={clicked ? 'nav-menu-active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className='nav-menu-toggle'>
                        <div className='menu-bars'>
                            <i class="fa-solid fa-xmark" onClick={showNavBar}></i>
                        </div>
                    </li>
                    {currentUser ? AuthNavbarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to ={item.path} state={currentUser}>
                                    {item.icon} 
                                    {item.label === 'Logout' ? <button onClick={handleLogout}>Logout</button> : <span>{item.label}</span>}
                                </Link>
                            </li>
                        )
                    }) : NavBarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to ={item.path} >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )

}

export default NavBar;