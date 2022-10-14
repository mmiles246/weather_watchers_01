import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom'
import UserBanner from "./UserBanner";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
// import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'



function ImagePage ({currentUser}) {
    const [imageObject, setImageObject]=useState({})
    const [userWhoPosted, setUserWhoPosted] = useState('')
    const [userWhoPostedAvatar, setUserWhoPostedAvatar] = useState('')
    const [usersWhoLiked, setUsersWhoLiked] = useState([])
    const [comments, setComments] = useState([])
    const [likeClick, setLikeClick] = useState(false)
    const [newComment, setNewComment] = useState(false)

    const [clickToComment, setClickToComment] = useState(true)

    let location = useLocation();


    const imageId = location.state

    useEffect(() => {
        fetch(`/clicked_image/${imageId}`)
        .then(res => res.json())
        .then(data => {
            setUserWhoPosted(data.user)
            setUsersWhoLiked(data.users_who_liked)
            setImageObject(data)
            // setComments(data.comments)
            fetch(`/user-who-posted/${data.user.id}`)
            .then(res => res.json())
            .then(data => {
            setUserWhoPostedAvatar(data.avatar_url)
            setLikeClick(false)
            setNewComment(false)
            fetch(`/image-comments/${imageId}`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })
        })


        })
        
    }, [likeClick, newComment])

    const numLikes = usersWhoLiked.length

    function clickToLike (e) {
        fetch(`/like-image`, {
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
        setLikeClick(true)
    }
    
    function clickToUnlike (e) {
        e.preventDefault()
        fetch(`/unlike-image/${imageId}`, {
            method: 'DELETE'
        })
        setLikeClick(true)
    }

    function commentMapper (eachComment) {
        console.log(eachComment.user)
        return <CommentCard content={eachComment.content} user={eachComment.user.username} />
    }


    return(
        <>
        <div className="whole-page">
            <div className='image-page'>
                
                <div className='image-page-container'>
                    <UserBanner userWhoPosted={userWhoPosted} userWhoPostedAvatar={userWhoPostedAvatar} />
                    <img className='image-page-image' src={imageObject.image_url} id={imageObject.id} onClick={!usersWhoLiked.includes(currentUser.id) ? clickToLike : clickToUnlike} />
                    
                </div>
                    
            </div>
            <div className="comment-container">
                <div className="likes-banner">
                    {usersWhoLiked.includes(currentUser.id) ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
                    <p>{numLikes} likes</p>
                    <div className="comment-icon" >
                        {/* <FontAwesomeIcon icon="fa-comment" /> */}
                        {/* <i class="fa-regular fa-comment" ></i> */}
                    </div>
                </div>
                <div className="comment-board">
                        {clickToComment ? <CommentForm currentUser={currentUser} imageId={imageId} setNewComment={setNewComment} /> : <></> }
                        {comments ? 
                        comments.map(commentMapper)
                        :
                        <></>}
                </div>
            </div>
        </div>
        </>
    )
}

export default ImagePage;