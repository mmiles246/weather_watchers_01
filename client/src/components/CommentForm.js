import { useState } from 'react'

function CommentForm () {

    return(
        <>
        <form className='comment-form'>
            <textarea className='comment-textarea' label='Leave Comment...' type='text'>
            </textarea>
        </form>
        </>
    )
}

export default CommentForm;