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

function AuthenticatedApp ({currentUser, setCurrentUser, userLocationKey, userLocationName, userState, setLat, setLng, currentConditions, triggerLocation, locate, iconNum, placeId, setPlaceId, storedLocations, isMounted, currentLocationInfo, clickedImageUrl, setClickedImageUrl, clickedImageId, setClickedImageId, imageClick, clickEffect}) {
    // const [clickedImageUrl, setClickedImageUrl] = useState()
    // const [clickedImageId, setClickedImageId] = useState()
    // const [clickedImage, setClickedImage] = useState()
    const [imageObjs, setImageObjs] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [dateOfLastPost, setDateOfLastPost] = useState()
    const [numOfPosts, setNumofPosts] = useState()
    // const [currentLocationInfo, setCurrentLocationInfo]=useState([])

    // const isMounted = useRef(false)

    let navigate = useNavigate()

    

    useEffect(() => {
        fetch('/my_posts')
        .then((res) => res.json())
        .then(res => {
            console.log(res)
            setImageObjs(res)
            setNumofPosts(res.length)
            setDateOfLastPost(new Date(res.slice(-1)[0].date_posted))
        })
    }, [currentUser])

    let diffInDate=null

    if (dateOfLastPost) {

        const currentDate = new Date()
        const dayOfLastPost = dateOfLastPost
        const timeOfLastPost = dayOfLastPost.getTime()
        

        const diffInTime = currentDate.getTime() - timeOfLastPost
        console.log(diffInTime)
        diffInDate = Math.floor(diffInTime/(1000*60*60*24))
    }

    function imageObjsMapper (obj) {
        return(
        <div className='image-container'>
            <img className='current-user-feed-image' src={obj.image_url} imageId={obj.id} postedAt={obj.created_at} imageObj={{obj}} onClick={(e) => {imageClick(e)}} />
        </div>)
    }

    
    return (
        <>
        <NavBar setLat={setLat} setLng={setLng} currentUser={currentUser} setCurrentUser={setCurrentUser} placeId={placeId} setPlaceId={setPlaceId} storedLocations={storedLocations} />
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
                    // clickEffect={clickEffect}
                    />
                } />
                <Route path='signup' element={<Signup />} />
                <Route path='login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path='feed' element={<FeedPage />}>
                    <Route path='popular' element={<FeedPage/>} />
                </Route>
                <Route path='my-account' element={<UserAccountPage currentUser={currentUser} clickedImageId={clickedImageId} setClickedImageId={setClickedImageId} clickedImageUrl={clickedImageUrl} setClickedImageUrl={setClickedImageUrl} imageClick={imageClick} isMounted={isMounted} imageObjs={imageObjs} imageObjsMapper={imageObjsMapper} userInfo={userInfo} setUserInfo={setUserInfo} dateOfLastPost={dateOfLastPost} setDateOfLastPost={setDateOfLastPost} numOfPosts={numOfPosts} diffInDate={diffInDate}  />}/>
                <Route path='user/:id' element={<UserFeedPage imageObjsMapper={imageObjsMapper} isMounted={isMounted} imageClick={imageClick} clickedImageId={clickedImageId} setClickedImageId={setClickedImageId} userInfo={userInfo} setUserInfo={setUserInfo} dateOfLastPost={dateOfLastPost} setDateOfLastPost={setDateOfLastPost} numOfPosts={numOfPosts} setNumofPosts={setNumofPosts} />} />
                <Route path='image/:id' element={<ImagePage currentUser={currentUser}  />} />
                <Route path='create-post' element={<PostModal currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                {/* </Route> */}
            </Routes>
        </>
    )

}

export default AuthenticatedApp;
