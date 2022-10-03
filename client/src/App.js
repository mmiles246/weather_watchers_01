import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import {BrowserRouter, useOutletContext} from 'react-router-dom'
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticateApp';
import {useLoadScript} from '@react-google-maps/api'

function App() {
  const [currentUser, setCurrentUser] = useState()    
  const [authCheck, setAuthCheck] = useState(false)         
  const [userPostalCodeSearch, setUserPostalCodeSearch] = useState(null)        
  const [userLocationKey, setUserLocationKey] = useState(null)  //possibly no longer needed, TBD.
  const [userLocationName, setUserLocatioName] = useState(null)   //string with the name of users location
  const [userState, setUserState] = useState('')
  const [currentConditions, setCurrentConditions] = useState({})  //holds object containing users locations current conditions.
  const [iconNum, setIconNum] = useState()
  const [lat, setLat] = useState(sessionStorage.getItem('lat'))
  const [lng, setLng] = useState(sessionStorage.getItem('lng'))
  const [status, setStatus] = useState(null)                   //geolocater status
  const [locate, setLocate] = useState(false)
  const [placeId, setPlaceId] = useState('')
  const [storedLocations, setStoredLocations] = useState([])
  const [currentLocationInfo, setCurrentLocationInfo]=useState([])

  // const [clickedImageUrl, setClickedImageUrl] = useState()
  // const [clickedImageId, setClickedImageId] = useState()
  // const [clickedImage, setClickedImage] = useState()
  // const [imageObjs, setImageObjs] = useState([])

  const isMounted = useRef(false)

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json().then(user => {setCurrentUser(user)})
      }
    })
    // .then(res => {
    //   if (res.ok) {
    //     res.json()
    //     setCurrentUser(res)
    //   }
    // })
  }, [])

  useEffect(() => {
    fetch('/locations-placeids')
    .then(res => res.json())
    .then(data => {
        if (data) {
            setStoredLocations(data)
    }})
    
}, [])


  function triggerLocation () {               //"Buffer" function to help handle conditional icon rendering based on returned weather icon from get request.
    setLocate(true);
    getLocation();
}

  function getLocation () {
    if (!navigator.geolocation) {
      setStatus('Geolocation not supported by your browser.');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        sessionStorage.setItem('lat', position.coords.latitude)
        sessionStorage.setItem('lng', position.coords.longitude)
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrive your location.');
      })
    }
  }

    useEffect(() => {
      fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_ACCUWEATHER_KEY}&q=${lat}%2C${lng}`)  
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        setUserLocationKey(res.Key)
        setUserLocatioName(res.EnglishName)            //api requests timed out for the day, necessary notation TBD.
        setUserState(res.AdministrativeArea.ID)
        return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${res.Key}?apikey=OsURg1PXKrkIswSEQHCGvY7yHyTJpVkP`)  
        })
        .then(res => res.json())
        .then(res =>  {
          // console.log(res[0])
          setCurrentConditions(res[0])
          setIconNum(res[0].WeatherIcon)
        })
      }, [lat, lng])

      useEffect(() => {
        fetch(`/location-placeId/${placeId}`)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log(data)
                    setCurrentLocationInfo(data)
                })
            }
        })
    }, [placeId])
  
  return (
    <BrowserRouter>
    {
      currentUser ? <AuthenticatedApp
      currentUser={currentUser}
      setCurrentUser={setCurrentUser} 
      userLocationKey={userLocationKey}
      userLocationName={userLocationName}
      userState={userState}
      currentConditions={currentConditions}
      triggerLocation ={triggerLocation}
      setLat={setLat}
      setLng={setLng}
      locate={locate}
      iconNum={iconNum}
      placeId={placeId}
      setPlaceId={setPlaceId}
      storedLocations={storedLocations}
      isMounted={isMounted}
      currentLocationInfo={currentLocationInfo} /> 
      : 
      <UnauthenticatedApp
      currentUser={currentUser}
      setCurrentUser={setCurrentUser} 
      userLocationKey={userLocationKey}
      userLocationName={userLocationName}
      userState={userState}
      currentConditions={currentConditions}
      triggerLocation ={triggerLocation}
      setLat={setLat}
      setLng={setLng}
      locate={locate}
      iconNum={iconNum}
      placeId={placeId}
      setPlaceId={setPlaceId}
      storedLocations={storedLocations}
      isMounted={isMounted}
      currentLocationInfo={currentLocationInfo}
      />
    }
    </BrowserRouter>
  );
}

export default App;