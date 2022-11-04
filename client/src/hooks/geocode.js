import { useState, useEffect } from "react";
import Geocode from "react-geocode"

function geocode (address) {
    const [hookLatLng, setHookLatLng] = useState({lat: 0, lng: 0})
    
    const latAndLng = hookLatLng

    useEffect(() => {
        Geocode.fromAddress(address)
            .then(res => {
                setHookLatLng.lat(res.results[0].geometry.location.lat)
                setHookLatLng.lng(res.results[0].geometry.location.lng)
            })
    }, [address])

    return latAndLng; 
}