import AccountPageBanner from './AccountPageBanner'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function UserFeedPage ({imageObjsMapper, isMounted, imageClick, clickedImageId, setClickedImageId, userInfo, setUserInfo, dateOfLastPost, setDateOfLastPost, numOfPosts, setNumOfPosts, diffInDate, calculateDays, lastPostedFrom, setLastPostedFrom, lastPostedFromName, setLastPostedFromName, setPlaceId, setLat, setLng}) {
    // const [userObject, setUserObject] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [userAvatar, setUserAvatar] = useState()
    // const [lastPostedFrom, setLastPostedFrom] = useState({})

    const location =  useLocation()
    const userObj = location.state

    let navigate = useNavigate()

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
            // setNumOfPosts(data.length)
            setDateOfLastPost(new Date(data.slice(-1)[0].date_posted))
            setLastPostedFrom(data.slice(-1)[0].location)
            setLastPostedFromName(data.slice(-1)[0].location.name.slice(0, -5))
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


    return(
        <>
        <div className="feed-container">
            <div className='feed-header'>
                <AccountPageBanner userAvatar={userAvatar} userInfo={userInfo} numOfPosts={numOfPosts} diffInDate={diffInDate} dateOfLastPost={dateOfLastPost} calculateDays={calculateDays} lastPostedFrom={lastPostedFrom} lastPostedFromName={lastPostedFromName} setPlaceId={setPlaceId} setLat={setLat} setLng={setLng} />
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