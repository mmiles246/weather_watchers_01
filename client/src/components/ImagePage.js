import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom'
import UserBanner from "./UserBanner";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
// import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'



function ImagePage ({currentUser, lastPostedFrom, setLastPostedFrom}) {
    const [imageObject, setImageObject]=useState({})
    const [caption, setCaption] = useState('')
    const [userWhoPosted, setUserWhoPosted] = useState('')
    const [userWhoPostedAvatar, setUserWhoPostedAvatar] = useState('')
    const [usersWhoLiked, setUsersWhoLiked] = useState([])
    const [comments, setComments] = useState([])
    const [likeClick, setLikeClick] = useState(false)
    const [newComment, setNewComment] = useState(false)
    const [usersThatLikedComment, setUsersThatLikedComment] = useState([])

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
            setCaption(data.caption)
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
                console.log(data)
                setComments(data)
                setUsersThatLikedComment(data.users_who_liked)
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
        return <CommentCard id={eachComment.id} content={eachComment.content} user={eachComment.user.username} currentUser={currentUser} usersThatLikedComment={eachComment.users_who_liked} setLikeClick={setLikeClick} />
    }


    return(
        <>
        <div className="whole-page">
            <div className='image-page'>
                
                <div className='image-page-container'>
                    <UserBanner userWhoPosted={userWhoPosted} userWhoPostedAvatar={userWhoPostedAvatar} currentUser={currentUser} lastPostedFrom={lastPostedFrom} setLastPostedFrom={setLastPostedFrom} />
                    <img className='image-page-image' src={imageObject.image_url} id={imageObject.id} onClick={!usersWhoLiked.includes(currentUser.id) ? clickToLike : clickToUnlike} />
                    
                </div>
                    
            </div>
            <div className="comment-container">
                <div className="likes-banner">
                    <div onClick={!usersWhoLiked.includes(currentUser.id) ? clickToLike : clickToUnlike}>
                        {usersWhoLiked.includes(currentUser.id) ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
                    </div>
                    <p>{numLikes} likes</p>
                    {clickToComment ? 
                    <CommentForm currentUser={currentUser} imageId={imageId} setNewComment={setNewComment} setClickToComment={setClickToComment} />
                    :
                    <div className="comment-icon" onClick={() => setClickToComment(true)} >
                        {/* <FontAwesomeIcon icon="fa-comment" /> */}
                        <i class="fa-regular fa-comment" ></i>
                    </div>
                    }
                </div>
                <div className='caption-container'>
                    {caption ? caption : ''}
                </div>
                <div className="comment-board">
                        
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