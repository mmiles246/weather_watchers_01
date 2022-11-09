import { useState } from 'react'

function CommentForm ({currentUser, imageId, setNewComment, setClickToComment}) {
    const [commentContent, setCommentContent] = useState('')

    function postComment (e) {
        e.preventDefault()
        fetch(`/post-comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: commentContent,
                user_id: currentUser.id,
                post_id: imageId
            })
        })
        setCommentContent('')
        setNewComment(true)
        setClickToComment(false)
    }

    return(
        <>
        <form className='comment-form' onSubmit={postComment}>
            <textarea className='comment-textarea' label='Leave Comment...' type='text' id='comment-form' onChange={(e) => {setCommentContent(e.target.value)}} value={commentContent}>
            </textarea>
            <button type='submit'>Post Comment</button>
        </form>
        </>
    )
}

export default CommentForm;