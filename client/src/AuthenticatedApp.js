import { Routes, Route, useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from 'react'
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import FeedPage from "./components/FeedPage";
import UserAccountPage from "./components/UserAccountPage";
import PostModal from "./components/PostModal";
import UserFeedPage from "./components/UserFeedPage";
import ImagePage from "./components/ImagePage";
import TodaysHomePageFeed from "./components/TodaysHomePageFeed";
import PopularPostsFeed from "./components/PopularPostsFeed";

function AuthenticatedApp ({currentUser, setCurrentUser, userLocationKey, userLocationName, userState, setLat, setLng, currentConditions, triggerLocation, locate, iconNum, placeId, setPlaceId, storedLocations, isMounted, currentLocationInfo, setCurrentLocationInfo, clickedImageUrl, setClickedImageUrl, clickedImageId, setClickedImageId, imageClick, clickEffect, dateOfLastPost, setDateOfLastPost, imageObjsMapper, autoCompleteAddress, setAutoCompleteAddress}) {
    // const [clickedImageUrl, setClickedImageUrl] = useState()
    // const [clickedImageId, setClickedImageId] = useState()
    // const [clickedImage, setClickedImage] = useState()
    const [imageObjs, setImageObjs] = useState([])
    const [userInfo, setUserInfo] = useState({})
    // const [dateOfLastPost, setDateOfLastPost] = useState()
    const [numOfPosts, setNumofPosts] = useState()
    const [lastPostedFrom, setLastPostedFrom] = useState({})
    const [lastPostedFromName, setLastPostedFromName] = useState('')
    // const [currentLocationInfo, setCurrentLocationInfo]=useState([])

    // const isMounted = useRef(false)

    let navigate = useNavigate()

    

    // useEffect(() => {
    //     fetch('/my_posts')
    //     .then((res) => res.json())
    //     .then(res => {
    //         console.log(res)
    //         setImageObjs(res)
    //         setNumofPosts(res.length)
    //         setDateOfLastPost(new Date(res.slice(-1)[0].date_posted))
    //         setLastPost(res.slice(-1)[0])
    //     })
    // }, [currentUser])

    let diffInDate=null;

    function calculateDays (dateOfLastPost) {
        if (dateOfLastPost) {

            const currentDate = new Date()
            const dayOfLastPost = dateOfLastPost
            const timeOfLastPost = dayOfLastPost.getTime()
            
    
            const diffInTime = currentDate.getTime() - timeOfLastPost
            console.log(diffInTime)
            diffInDate = Math.floor(diffInTime/(1000*60*60*24))
        }
        return diffInDate;
    }



    // function imageObjsMapper (obj) {
    //     return(
    //     <div className='image-container'>
    //         <img className='current-user-feed-image' src={obj.image_url} imageId={obj.id} postedAt={obj.created_at} imageObj={{obj}} onClick={(e) => {imageClick(e)}} />
    //     </div>)
    // }

    
    return (
        <>
        <NavBar setLat={setLat} setLng={setLng} currentUser={currentUser} setCurrentUser={setCurrentUser} placeId={placeId} setPlaceId={setPlaceId} storedLocations={storedLocations} setCurrentLocationInfo={setCurrentLocationInfo} autoCompleteAddress={autoCompleteAddress} setAutoCompleteAddress={setAutoCompleteAddress} />
        <Routes>
                <Route path='/' element={
                    <Home 
                    userLocationKey={userLocationKey}
                    userLocationName={userLocationName}
                    userState={userState} 
                    currentConditions={currentConditions}
                    triggerLocation={triggerLocation} 
                    locate={locate} 
                    iconNum={iconNum}
                    placeId={placeId}
                    setPlaceId={setPlaceId}
                    currentUser={currentUser} 
                    clickedImageId={clickedImageId} 
                    setClickedImageId={setClickedImageId} 
                    clickedImageUrl={clickedImageUrl} 
                    setClickedImageUrl={setClickedImageUrl} 
                    // clickedImage={clickedImage} 
                    // setClickedImage={setClickedImage} 
                    imageClick={imageClick} 
                    isMounted={isMounted}
                    imageObjs={imageObjs}
                    currentLocationInfo={currentLocationInfo}
                    imageObjsMapper={imageObjsMapper}
                    // clickEffect={clickEffect}
                    />
                } />
                <Route path='signup' element={<Signup />} />
                <Route path='login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                {/* <Route path='feed' element={<FeedPage />}> */}
                <Route path='popular' element={<PopularPostsFeed imageObjsMapper={imageObjsMapper} imageClick={imageClick} isMounted={isMounted} clickedImageId={clickedImageId} setClickedImageId={setClickedImageId} />} />
                {/* </Route> */}
                <Route path='my-account' element={<UserAccountPage currentUser={currentUser} clickedImageId={clickedImageId} setClickedImageId={setClickedImageId} clickedImageUrl={clickedImageUrl} setClickedImageUrl={setClickedImageUrl} imageClick={imageClick} isMounted={isMounted} imageObjs={imageObjs} imageObjsMapper={imageObjsMapper} userInfo={userInfo} setUserInfo={setUserInfo} dateOfLastPost={dateOfLastPost} setDateOfLastPost={setDateOfLastPost} numOfPosts={numOfPosts} diffInDate={diffInDate} lastPostedFrom={lastPostedFrom} setLastPostedFrom={setLastPostedFrom} lastPostedFromName={lastPostedFromName} setLastPostedFromName={setLastPostedFromName} setPlaceId={setPlaceId} setAutoCompleteAddress={setAutoCompleteAddress} setLat={setLat} setLng={setLng}  />}/>
                <Route path='user/:id' element={<UserFeedPage imageObjsMapper={imageObjsMapper} isMounted={isMounted} imageClick={imageClick} clickedImageId={clickedImageId} setClickedImageId={setClickedImageId} userInfo={userInfo} setUserInfo={setUserInfo} dateOfLastPost={dateOfLastPost} setDateOfLastPost={setDateOfLastPost} numOfPosts={numOfPosts} setNumofPosts={setNumofPosts} calculateDays={calculateDays} lastPostedFrom={lastPostedFrom} setLastPostedFrom={setLastPostedFrom} lastPostedFromName={lastPostedFromName} setLastPostedFromName={setLastPostedFromName} setPlaceId={setPlaceId} setLat={setLat} setLng={setLng} />} />
                <Route path='image/:id' element={<ImagePage currentUser={currentUser} lastPostedFrom={lastPostedFrom} setLastPostedFrom={setLastPostedFrom}  />} />
                <Route path='create-post' element={<PostModal currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                {/* </Route> */}
            </Routes>
        </>
    )

}

export default AuthenticatedApp;
