import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";


function UnauthenticatedApp ({currentUser, setCurrentUser, userLocationKey, userLocationName, userState, setLat, setLng, currentConditions, triggerLocation, locate, iconNum, placeId, setPlaceId, storedLocations, isMounted, currentLocationInfo, setCurrentLocationInfo, setStoredLocations, clickedImageUrl, setClickedImageUrl, clickedImageId, setClickedImageId, imageClick, imageObjsMapper}) {

    return(
        <>
        <NavBar setLat={setLat} setLng={setLng} placeId={placeId} setPlaceId={setPlaceId} storedLocations={storedLocations} setStoredLocations={setStoredLocations} setCurrentLocationInfo={setCurrentLocationInfo} />
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
                    isMounted={isMounted}
                    currentLocationInfo={currentLocationInfo}
                    imageClick={imageClick}
                    imageObjsMapper={imageObjsMapper}
                    />
                } />
                <Route path='signup' element={<Signup storedLocations={storedLocations} setStoredLocations={setStoredLocations}/>} />
                <Route path='login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                {/* </Route> */}
            </Routes>
        </>
    )

}

export default UnauthenticatedApp;