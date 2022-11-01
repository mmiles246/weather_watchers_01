import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom';
import EditAccountDropMenu from './user-account-components/EditAccountDropMenu';
import Geocode from "react-geocode"

function AccountPageBanner ({currentUser, userAvatar, userInfo, numOfPosts, lastPosted, diffInDate, dateOfLastPost, calculateDays, lastPostedFrom, lastPostedFromName, setPlaceId, setLat, setLng}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    let navigate = useNavigate()


    function onSubmit (e) {
        e.preventDefault()
        const data = new FormData()
        data.append('avatar', e.target.profileimage.files[0])

        submitData(data)
    }

    useEffect(() => {
        Geocode.fromAddress(lastPostedFromName)
        .then(res => {
            setLat(res.results[0].geometry.location.lat)
            setLng(res.results[0].geometry.location.lng)
        })
    } ,[bannerLocClick])

    function bannerLocClick () {
        setPlaceId(lastPostedFrom.place_id);
        navigate('/');
    }

    function submitData(data) {

        fetch(`update_user/${currentUser.id}`, {
            method: 'PATCH',
            body: data,
        })
    }

    console.log(lastPostedFrom)
    return(
        <>
        <div className="banner-container">
            <div className="account-avatar">
                {}
                {(currentUser ? <img className='current-user-blank-avatar' src={currentUser.avatar_url} onClick={() => setShow(true)} /> : <img className='current-user-blank-avatar' src={userAvatar} />)}
                <h3>{userInfo ? userInfo.username : ''}</h3>
            </div>
            <div className="account-info">
                <div id='num-posts'>
                    <h3>Posts: </h3>
                    <h3>{numOfPosts}</h3>
                </div>
                <br></br>
                <div id='last-posted'>
                    {/* <h3>Last Posted: </h3>
                    <h3>{(diffInDate === 0) ? 'today' : (diffInDate + ' days ago')} </h3> */}
                    <h3>LastPosted From:</h3>
                    <h3 onClick={bannerLocClick}>{lastPostedFromName}</h3>
                </div>
                <div id='account-drop-menu'>
                    {/* <EditAccountDropMenu currentUser={currentUser}/> */}
                </div>
            </div>
            
        </div>
        </>
    )
}

export default AccountPageBanner;