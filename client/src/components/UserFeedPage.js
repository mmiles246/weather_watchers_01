import AccountPageBanner from './AccountPageBanner'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function UserFeedPage ({imageObjsMapper, isMounted, imageClick, clickedImageId, setClickedImageId}) {
    const [userObject, setUserObject] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [userAvatar, setUserAvatar] = useState()
    const [userInfo, setUserInfo] = useState({})

    const location =  useLocation()
    const userObj = location.state

    let navigate = useNavigate()
    const numOfPosts = userPosts.length

    useEffect(()=> {
        fetch(`/user/${userObj.id}`)
        .then(res => res.json())
        .then(data => {
            setUserInfo(data)
            setUserAvatar(data.avatar_url)
        })
        fetch(`/users_posts/${userObj.id}`)
        .then(res => res.json())
        .then(data => {
            setUserPosts(data)
        })
    }, [])

    useEffect(() => {
        if (isMounted.current) {
            navigate(`/image/${clickedImageId}`, {state: clickedImageId})
            isMounted.current = false
            setClickedImageId(null)
        } else {
            isMounted.current = false
        }
    }, [imageClick])

    const postDates = userPosts.map((post) => new Date(post.created_at))
    console.log(postDates)

    

    function lastPosted (posts) {
        
        return 
    }

    for (let i=0; i<postDates.length; i++) {
            const currentDate=new Date()
            const postDate=postDates[i]

            const diffInTime=currentDate.getTime() - postDate.getTime()
            const diffInDate=Math.floor(diffInTime/(1000*3600*24))

            console.log(diffInDate)
        }






    return(
        <>
        <div className="feed-container">
            <div className='feed-header'>
                <AccountPageBanner userAvatar={userAvatar} userInfo={userInfo} numOfPosts={numOfPosts}/>
                <div className='user-avatar'>
                    {/* {!currentUser.avatar_url ? <i class="fa-solid fa-user" onClick={() => setShow(true)}></i> : <img className='current-user-blank-avatar' src={currentUser.avatar_url} onClick={() => setShow(true)}/>} */}
                    {/* <img className={currentUser.avatar ? '' : ''}/> */}
                </div>
                <div className='current-user'>
                    {/* <h1>Hello</h1> */}
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