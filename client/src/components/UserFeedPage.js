import AccountPageBanner from './AccountPageBanner'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function UserFeedPage ({imageObjsMapper, isMounted, imageClick, clickedImageId, setClickedImageId, userInfo, setUserInfo, dateOfLastPost, setDateOfLastPost, numOfPosts, setNumOfPosts, diffInDate, calculateDays}) {
    const [userObject, setUserObject] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [userAvatar, setUserAvatar] = useState()
    // const [userInfo, setUserInfo] = useState({})
    // const [lastPost, setLastPost] = useState({})
    // const [dateOfLastPost, setDateOfLastPost] = useState()

    const location =  useLocation()
    const userObj = location.state

    let navigate = useNavigate()
    // let numOfPosts = userPosts.length

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
            setNumOfPosts(data.length)
            setDateOfLastPost(new Date(data.slice(-1)[0].date_posted))
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

    // const postDates = userPosts.map((post) => new Date(post.created_at))
    // console.log(postDates)

    // let diffInDate=null

    // if (dateOfLastPost) {

    //     const currentDate = new Date()
    //     console.log(currentDate)
    //     const dayOfLastPost = dateOfLastPost
    //     const timeOfLastPost = dayOfLastPost.getTime()
        

    //     const diffInTime = currentDate.getTime() - timeOfLastPost
    //     console.log(diffInTime)
    //     diffInDate = Math.floor(diffInTime/(1000*60*60*24))
    // }

    return(
        <>
        <div className="feed-container">
            <div className='feed-header'>
                <AccountPageBanner userAvatar={userAvatar} userInfo={userInfo} numOfPosts={numOfPosts} diffInDate={diffInDate} dateOfLastPost={dateOfLastPost} calculateDays={calculateDays} />
                <div className='user-avatar'>
                </div>
                <div className='current-user'>
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