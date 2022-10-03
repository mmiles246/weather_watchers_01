import { Routes, Route } from "react-router-dom";
import {useState, useEffect, useRef} from 'react'
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import FeedPage from "./components/FeedPage";
import UserAccountPage from "./components/UserAccountPage";
import PostModal from "./components/PostModal";
import ImagePage from "./components/ImagePage";

function AuthenticatedApp ({currentUser, setCurrentUser, userLocationKey, userLocationName, userState, setLat, setLng, currentConditions, triggerLocation, locate, iconNum, placeId, setPlaceId, storedLocations}) {
    const [clickedImageUrl, setClickedImageUrl] = useState()
    const [clickedImageId, setClickedImageId] = useState()
    const [clickedImage, setClickedImage] = useState()
    const [imageObjs, setImageObjs] = useState([])

    const isMounted = useRef(false)

    useEffect(() => {
        fetch('/my_posts')
        .then((res) => res.json())
        .then(res => {
            console.log(res)
            setImageObjs(res)
        })
    }, [currentUser])

    function imageClick (e) {
        setClickedImageId(parseInt(e.target.getAttribute('imageId')))
        setClickedImageUrl(e.target.getAttribute('src'))
        setClickedImage(imageObjs.find(obj => obj.id === parseInt(e.target.getAttribute('imageId'))))
        isMounted.current = true
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
                    clickedImage={clickedImage} 
                    setClickedImage={setClickedImage} 
                    imageClick={imageClick} 
                    isMounted={isMounted}
                    imageObjs={imageObjs}
                    />
                } />
                <Route path='signup' element={<Signup />} />
                <Route path='login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                <Route path='feed' element={<FeedPage />}>
                    <Route path='popular' element={<FeedPage/>} />
                </Route>
                <Route path='my-account' element={<UserAccountPage currentUser={currentUser} clickedImageId={clickedImageId} setClickedImageId={setClickedImageId} clickedImageUrl={clickedImageUrl} setClickedImageUrl={setClickedImageUrl} clickedImage={clickedImage} setClickedImage={setClickedImage} imageClick={imageClick} isMounted={isMounted} imageObjs={imageObjs} />}/>
                <Route path='image/:id' element={<ImagePage currentUser={currentUser}  />} />
                <Route path='create-post' element={<PostModal currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                {/* </Route> */}
            </Routes>
        </>
    )

}

export default AuthenticatedApp;
