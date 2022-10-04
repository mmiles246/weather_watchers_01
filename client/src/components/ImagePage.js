import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom'
import UserBanner from "./UserBanner";

function ImagePage ({currentUser}) {
    const [image, setImage]=useState({})
    const [userWhoPosted, setUserWhoPosted] = useState('')
    let location = useLocation();

    console.log(location.state)

    const imageId = location.state

    useEffect(() => {
        fetch(`/clicked_image/${imageId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUserWhoPosted(data.user)
            setImage(data)
        })
    }, [])

    function clickToLike (e) {
        console.log(e.target.id)
        fetch(`/like-image/${e.target.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                post_id: image.id,
            })
        }
        )
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return(
        <>
        <div className='image-page'>
            
                <div className='image-page-container'>
                    <UserBanner userWhoPosted={userWhoPosted} />
                    <img className='image-page-image' src={image.image_url} id={image.id} onClick={clickToLike} />
                </div>
          
        </div>
        </>
    )
}

export default ImagePage;