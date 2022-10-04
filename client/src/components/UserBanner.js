function UserBanner ({userWhoPosted}) {
    console.log(userWhoPosted)
    return(
        <>
        <div className='user-banner-container'>
            <div className='user-banner'>
                <div className='user-banner-avatar'>
                    <img src={userWhoPosted.avatar_url}/>
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