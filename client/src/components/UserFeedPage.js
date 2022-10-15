import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function UserFeedPage ({imageObjsMapper}) {
    const [userObject, setUserObject] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [userAvatar, setUserAvatar] = useState()

    const location =  useLocation()
    const userObj = location.state

    useEffect(()=> {
        fetch(`/user/${userObj.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUserAvatar(data.avatar_url)
        })
        fetch(`/users_posts/${userObj.id}`)
        .then(res => res.json())
        .then(data => {
            setUserPosts(data)
        })
    }, [])




    return(
        <>
        <div className="feed-container">
            <div className='feed-header'>
                <div className='user-avatar'>
                    {/* {!currentUser.avatar_url ? <i class="fa-solid fa-user" onClick={() => setShow(true)}></i> : <img className='current-user-blank-avatar' src={currentUser.avatar_url} onClick={() => setShow(true)}/>} */}
                    {/* <img className={currentUser.avatar ? '' : ''}/> */}
                </div>
                <div className='current-user'>
                    <h1>Hello</h1>
                </div>    
            </div>
            <div className='image-feed'>
                <br></br>
                {userPosts.map(imageObjsMapper)}
            </div>
        </div>
        </>
    )

}

export default UserFeedPage;