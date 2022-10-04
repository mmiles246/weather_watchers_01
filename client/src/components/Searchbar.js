import { useState, useEffect } from "react";
import Geocode from "react-geocode"
// import {LoadScript, Autocomplete} from '@react-google-maps/api'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Autocomplete from "react-google-autocomplete";

function SearchBar ({placeholder, setLat, setLng, placeId, setPlaceId, storedLocations, setStoredLocations}) {
    const [postalCode, setPostalCode] = useState('')
    const [autocompleteAddress, setAutocompleteAddress] = useState('')
    const [value, setValue] =useState(null)
    // const [placeId, setPlaceId] = useState('')

    const input = document.getElementById('input')
    const autocomplete = document.getElementById('autocomplete')

    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY)

    // autocomplete.setFields(['place_id']);

    // console.log(storedLocations)

    useEffect(() => {
        Geocode.fromAddress(autocompleteAddress)
        .then(res => {
            console.log(res)
            setLat(res.results[0].geometry.location.lat)
            setLng(res.results[0].geometry.location.lng)
        })
    } ,[autocompleteAddress])

    useEffect(() => {
        checkForSearchedLocation (placeId, storedLocations)
    }, [placeId])

    function checkForSearchedLocation (placeId, storedLocations) {
        console.log(placeId)
        console.log(storedLocations)
        if(!storedLocations.includes(placeId)) {
            console.log(false)
            fetch('/add_location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    place_id: placeId,
                    name: autocompleteAddress
                })
            })
            .then(res=>res.json())
            .then()
        } else {
            console.log(true)
        }
    }

    // function triggerLocationSearch (placeId) {
    //     checkForSearchedLocation(placeId, storedLocations)
    // }



    return(
        // <form  >
        // <LoadScript googleMapsApiKey="">
        <div className="search--primary">
            <div className="search-input">
                <Autocomplete apiKey={process.env.REACT_APP_GOOGLE_KEY} id='autocomplete' storedLocations={storedLocations} onPlaceSelected={(place, inputRef, autocomplete) => {
                    setPlaceId(place.place_id); 
                    setAutocompleteAddress(place.formatted_address);
                    // triggerLocationSearch(place.place_id);
                    // checkForSearchedLocation(storedLocations, place.place_id);
                    // console.log(storedLocations)
                    // console.log(place); 
                    console.log(place.formatted_address); 
                    
                    }}>
                    {/* <input id="input" type='text' /> */}
                </Autocomplete>
                    <div className="search-icon">
                        <button type='submit'>
                        <i class="fa-solid fa-magnifying-glass" ></i>
                        </button>
                    </div>
                
            </div>
        </div>
        // </LoadScript>
        // </form>
    )

}

export default SearchBar;