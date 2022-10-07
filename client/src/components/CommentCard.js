function CommentCard ({comments}) {
    console.log(comments)
    return(
        <>
        <div className="comment-card">
            <p>{comments[0].content}</p>
        </div>
        </>
    )
}

export default CommentCard;