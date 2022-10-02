import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";


function UnauthenticatedApp ({currentUser, setCurrentUser, userLocationKey, userLocationName, userState, setLat, setLng, currentConditions, triggerLocation, locate, iconNum, placeId, setPlaceId, storedLocations}) {

    return(
        <>
        <NavBar setLat={setLat} setLng={setLng} placeId={placeId} setPlaceId={setPlaceId} storedLocations={storedLocations} />
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
                    />
                } />
                <Route path='signup' element={<Signup />} />
                <Route path='login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                {/* </Route> */}
            </Routes>
        </>
    )

}

export default UnauthenticatedApp;