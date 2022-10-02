import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import NavBar from './Navbar';
import Autocomplete from "react-google-autocomplete";

function Signup () { 
    const [newUserLocationId, setNewUserLocationId] = useState()
    const [newUserFormattedAddress, setNewUserFotmattedAddress] = useState()
    const [storedLocations, setStoredLocations] = useState([])
    const [triggerFetch, setTriggerFetch] =useState(false)
    const [signupInfo, setSignUpInfo] = useState({
        username: "",
        email: "",
        password: "",
        location_id: null, 
    })

    useEffect(() => {
        fetch('/locations')
        .then(res => res.json())
        .then(data => {
            if (data) {
                console.log(data)
                setStoredLocations(data)
        }})
    }, [signupInfo.location_id])

    function handleInputChange (e) {
        const {name, value} = e.target;

        setSignUpInfo({
            ...signupInfo,
            [name]: value
    });
    }


    function addLocation (storedLocations) {
        let found = storedLocations.some(obj => obj.place_id === newUserLocationId)
        if(!found) {
            fetch('/add_location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    place_id: newUserLocationId,
                    name: newUserFormattedAddress
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                signupInfo.location_id=data.id
                setSignUpInfo({...signupInfo})
                setTriggerFetch(!triggerFetch)

                onSubmit()
            })
        } else {
            let location = storedLocations.find(({place_id}) => place_id === newUserLocationId)
            console.log(location)
            signupInfo.location_id = location.id

            onSubmit()
        }
    }

    function handleSubmit (e) {
        e.preventDefault() 
        addLocation(storedLocations)
        // onSubmit(e)
        
        // fetch('/new_user', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: signupInfo.username,
        //         email: signupInfo.email,
        //         password: signupInfo.password,
        //         location_id: signupInfo.location_id,
        //     })
        // })

                

    }
    
    function onSubmit () {
        // e.preventDefault()
        fetch(`/new_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username: signupInfo.username,
                    email: signupInfo.email,
                    password: signupInfo.password,
                    location_id: signupInfo.location_id,
                })

        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    // for(let i=0; i<storedLocations.length; i++) {
    //     if(storedLocations[i].place_id === newUserLocationId) {
    //         signupInfo.location = storedLocations[i].id
    //         break;
    //     } else {
    //         fetch('/new_location', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: {
    //                 place_id: newUserLocationId,
    //                 zipcode: ,
    //                 name: '', 
    //             }
    //         })
    //         .then()
    //         .then()
    //     }
    // }

    return (
        <>
         <div className='signup-page'>
            <div className="signup-box">
                <form className="signup-form" onSubmit={handleSubmit} >
                    {/* <label htmlFor="first_name_signup">First Name</label> */}
                    <input id="username-signup" 
                    type="text" 
                    placeholder="Username"
                    value={signupInfo.username}
                    name='username'
                    onChange={handleInputChange}
                    ></input>

                    <br></br>

                    {/* <label htmlFor="email_signup">Email</label> */}
                    <input id="email-signup" 
                    type='email' 
                    placeholder="Email"
                    value={signupInfo.email}
                    name='email'
                    onChange={handleInputChange}
                    ></input>

                    <br></br>

                    <Autocomplete apiKey={process.env.REACT_APP_GOOGLE_KEY} id='autocomplete' onPlaceSelected={(place, inputRef, autocomplete) => {
                        setNewUserLocationId(place.place_id); 
                        setNewUserFotmattedAddress(place.formatted_address);
                        setTriggerFetch(!triggerFetch) 
                        console.log(place); 
                        console.log(place.formatted_address)}}>
                    {/* <input id="input" type='text' /> */}
                    </Autocomplete>

                    {/* <label htmlFor="password_signup">Password</label> */}
                    <input id="password-signup" 
                    type='password' 
                    placeholder="Password"
                    value={signupInfo.password}
                    name='password'
                    onChange={handleInputChange}
                    ></input>

                    <br></br>

                    <br></br>

                    <button type='submit'>Submit</button>

                </form>

                <br></br>
                <br></br>

                <div className='login-link'>
                    <p>Already a member?</p>
                    <Link to="/login">Login Here</Link>

                </div>

            </div>
        </div>
        </>
    )

}

export default Signup;