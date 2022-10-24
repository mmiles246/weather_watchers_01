function AccountPageBanner ({userAvatar, userInfo, numOfPosts}) {

    return(
        <>
        <div className="banner-container">
            <div className="account-avatar">
                <img className='current-user-blank-avatar' src={userAvatar} />
                <h3>{userInfo ? userInfo.username : ''}</h3>
            </div>
            <div className="account-info">
                <h3>Posts {numOfPosts}</h3>
             
            </div>
            <div className="account-drop-menu">
                
            </div>
        </div>
        </>
    )
}

export default AccountPageBanner;