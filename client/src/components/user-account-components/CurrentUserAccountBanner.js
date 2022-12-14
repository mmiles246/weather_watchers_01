import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import EditAccountDropMenu from './EditAccountDropMenu';
import Geocode from "react-geocode"
import { useNavigate } from 'react-router-dom'

function CurrentUserAccountBanner ({currentUser, userAvatar, userInfo, numOfPosts, lastPost, lastPosted, diffInDate, dateOfLastPost, calculateDays, lastPostedFrom, lastPostedFromName, setPlaceId, setAutoCompleteAddress, setLat, setLng}) {
    const [userPostLocation, setUserPostLocation] = useState (lastPostedFromName)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    console.log(lastPostedFrom)


    let navigate= useNavigate()

    useEffect(() => {
        Geocode.fromAddress(lastPostedFromName)
        .then(res => {
            setLat(res.results[0].geometry.location.lat)
            setLng(res.results[0].geometry.location.lng)
        })
    } ,[locationClick])

    function locationClick () {
        setPlaceId(lastPostedFrom.place_id);
        navigate('/');
    }

    function onSubmit (e) { 
        e.preventDefault()
        const data = new FormData()
        data.append('avatar', e.target.profileimage.files[0])

        submitData(data)
    }

    function submitData(data) {

        fetch(`update_user/${currentUser.id}`, {
            method: 'PATCH',
            body: data,
        })
    }

    return(
        <>
        <div className="banner-container">
            <div className="account-avatar">
                {}
                {(currentUser ? <img className='current-user-blank-avatar' src={currentUser.avatar_url} onClick={() => setShow(true)} /> : <img className='current-user-blank-avatar' src={userAvatar} />)}
                <h3>{userInfo ? userInfo.username : ''}</h3>
            </div>
            <Modal
                size="sm"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                {!currentUser.avatar_url ? <Modal.Title id="example-modal-sizes-title-sm">Add a profile image?</Modal.Title> : <Modal.Title id="example-modal-sizes-title-sm">Update profile image?</Modal.Title> }
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={onSubmit}>
                        <input 
                        type='file'
                        accept='image/*'
                        name='profileimage'
                        id='profileimage'
                        />
                        <Button variant="primary" type='submit'>
                            Save Changes
                        </Button>
                    </form>
                </Modal.Body>
                
            </Modal>
            <div className="account-info">
                <div id='num-posts'>
                    <h3>Posts: </h3>
                    <h3>{numOfPosts}</h3>
                </div>
                <br></br>
                <div id='last-posted'>
                    {/* <h3>Last Posted: </h3>
                    <h3>{(diffInDate === 0) ? 'today' : (diffInDate + ' days ago')} </h3> */}
                    <h3>Last Posted From:</h3>
                    <h3 onClick={locationClick}>{lastPostedFromName}</h3>
                </div>
                <div id='account-drop-menu'>
                    <EditAccountDropMenu currentUser={currentUser}/>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default CurrentUserAccountBanner;