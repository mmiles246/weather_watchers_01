function CommentCard ({content, user}) {

    return(
        <>
        <div className="comment-card">
            <div className="comment-content">
                <p>{content}</p>
            </div>
            <div className="user-who-commented">
                <p>{user}</p>
            </div>
        </div>
        </>
    )
}

export default CommentCard;