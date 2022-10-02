function UserBanner ({user}) {
    console.log(user)
    return(
        <>
        <div className='user-banner-container'>
            <div className='user-banner'>
                <div className='user-banner-avatar'>
                    <img />
                </div>
                <div className='user-banner-username'>
                    <h3>{user.username}</h3>
                </div>
                <div className='user-banner-location'>

                </div>
            </div>

        </div>
        </>
    )
}

export default UserBanner;