import CurrentUserAccountBanner from './user-account-components/CurrentUserAccountBanner';
import FeedPage from './FeedPage'
import CurrentUserFeed from "./CurrentUserFeed";
import { useState, useEffect } from 'react'

function UserAccountPage ({currentUser, clickedImageId, setClickedImageId, clickedImageUrl, setClickedImageUrl, clickedImage, setClickedImage, imageClick, isMounted, imageObjs, imageObjsMapper, userInfo, setUserInfo, dateOfLastPost, setDateOfLastPost, numOfPosts, diffInDate, lastPostedFrom, setLastPostedFrom, lastPostedFromName, setLastPostedFromName, setPlaceId, setAutoCompleteAddress, setLat, setLng}) {
    const [currentUserPosts, setCurrentUserPosts] = useState([])
    

    useEffect(() => {
        fetch('/my_posts')
        .then((res) => res.json())
        .then(res => {
            console.log(res)
            setCurrentUserPosts(res)
            // setNumofPosts(res.length)
            // setDateOfLastPost(new Date(res.slice(-1)[0].date_posted))
            setLastPostedFrom(res.slice(-1)[0].location)
            setLastPostedFromName(res.slice(-1)[0].location.name.slice(0, -5))
        })
    }, [currentUser])

    

    return(
        <>
        <div className='feed-container'>
            <div className='feed-header'>
                <CurrentUserAccountBanner currentUser={currentUser} userInfo={currentUser} numOfPosts={numOfPosts} diffInDate={diffInDate} lastPostedFrom={lastPostedFrom} lastPostedFromName={lastPostedFromName} setPlaceId={setPlaceId} setAutoCompleteAddress={setAutoCompleteAddress} setLat={setLat} setLng={setLng} />
            </div>
            <div className='image-feed'>
                <CurrentUserFeed currentUser={currentUser} clickedImageId={clickedImageId} setClickedImageId={setClickedImageId} clickedImageUrl={clickedImageUrl} setClickedImageUrl={setClickedImageUrl} clickedImage={clickedImage} setClickedImage={setClickedImage} imageClick={imageClick} isMounted={isMounted} imageObjs={imageObjs} imageObjsMapper={imageObjsMapper} currentUserPosts={currentUserPosts} />
            </div>
        </div>
        </>
    )
}

export default UserAccountPage;