import { Link } from 'react-router-dom'

function UserBanner ({userWhoPosted, userWhoPostedAvatar, currentUser, lastPostedFrom, setLastPostedFrom}) {
    return(
        <>
        <div className='user-banner-container'>
            <div className='user-banner'>
                {userWhoPosted.id !== currentUser.id ? (<Link to={`/user/${userWhoPosted.id}`} state={userWhoPosted} >
                <div className='user-banner-avatar'>
                        {userWhoPostedAvatar ? <img src={userWhoPostedAvatar}/> : <i class="fa-solid fa-user"></i> }
                </div>
                </Link>) 
                : 
                (<Link to='/my-account' >
                    <div className='user-banner-avatar'>
                        {userWhoPostedAvatar ? <img src={userWhoPostedAvatar}/> : <i class="fa-solid fa-user"></i> }
                </div>
                </Link>)}
                
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