import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom'
import UserBanner from "./UserBanner";
import CommentForm from "./CommentForm";

function ImagePage ({currentUser}) {
    const [imageObject, setImageObject]=useState({})
    const [userWhoPosted, setUserWhoPosted] = useState('')
    const [userWhoPostedAvatar, setUserWhoPostedAvatar] = useState('')
    const [usersWhoLiked, setUsersWhoLiked] = useState([])

    const [clickToComment, setClickToComment] = useState(false)

    let location = useLocation();


    const imageId = location.state

    useEffect(() => {
        fetch(`/clicked_image/${imageId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUserWhoPosted(data.user)
            setUsersWhoLiked(data.users_who_liked)
            setImageObject(data)
            fetch(`/user-who-posted/${data.user.id}`)
            .then(res => res.json())
            .then(data => {
            setUserWhoPostedAvatar(data.avatar_url)
        })


        })
        
    }, [])

    function clickToLike (e) {
        fetch(`/like-image/${e.target.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                post_id: e.target.id,
            })
        }
        )
        .then(res => res.json())
        .then(data => console.log(data))
    }


    return(
        <>
        <div className="whole-page">
            <div className='image-page'>
                
                <div className='image-page-container'>
                    <UserBanner userWhoPosted={userWhoPosted} userWhoPostedAvatar={userWhoPostedAvatar} />
                    <img className='image-page-image' src={imageObject.image_url} id={imageObject.id} onClick={clickToLike} />
                        
                </div>
                    
            </div>
            <div className="comment-container">
                <div className="likes-banner">
                    {usersWhoLiked.includes(currentUser.id) ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
                    <p>Likes will be here</p>
                </div>
                <div className="comment-board">
                        {clickToComment ? <CommentForm /> : <></>}
                </div>
            </div>
        </div>
        </>
    )
}

export default ImagePage;