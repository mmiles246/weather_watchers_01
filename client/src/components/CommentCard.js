import { useState } from 'react'

function CommentCard ({content, user, currentUser, id, usersThatLikedComment, setLikeClick}) {

    function likeComment (e) {
        fetch(`/like-comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment_id: id, 
                user_id: currentUser.id,
            })
        })
        setLikeClick(true)
    }

    function dislikeComment () {
        fetch(`/unlike-comment/${id}`, {
            method: 'DELETE'
        })
        setLikeClick(true)
    }

    return(
        <>
        <div className="comment-card">
            <div className="comment-content">
                <p>{content}</p>
            </div>
            <div className="user-who-commented">
                <p>{user}</p>
            </div>
            {usersThatLikedComment.includes(currentUser.id) ? 
                <div className='comment-like' onClick={dislikeComment}>
                    <i class="fa-solid fa-heart"></i>
                </div>
                :
                <div className='comment-like' onClick={likeComment}>
                    <i class="fa-regular fa-heart"></i>
                </div>}
            
        </div>
        </>
    )
}

export default CommentCard;