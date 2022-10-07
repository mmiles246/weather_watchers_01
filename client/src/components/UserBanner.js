function UserBanner ({userWhoPosted, userWhoPostedAvatar}) {
    return(
        <>
        <div className='user-banner-container'>
            <div className='user-banner'>
                <div className='user-banner-avatar'>
                    <img src={userWhoPostedAvatar}/>
                </div>
                <div className='user-banner-username'>
                    <h3>{userWhoPosted.username}</h3>
                </div>
                <div className='user-banner-location'>

                </div>
            </div>

        </div>
        </>
    )
}

export default UserBanner;