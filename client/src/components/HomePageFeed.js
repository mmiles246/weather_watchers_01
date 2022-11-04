import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom'


function HomePageFeed ({userLocationName, placeId, currentUser, clickedImageId, setClickedImageId, clickedImageUrl, setClickedImageUrl, imageClick, isMounted, currentLocationInfo}) {

    let navigate = useNavigate()


    useEffect(() => {
        if (isMounted.current) {
            navigate(`/image/${clickedImageId}`, {state: clickedImageId})
            isMounted.current = false
            setClickedImageId(null)
        } 
        // else {
        //     isMounted.current = false
        // }
    }, [imageClick])


    function imageMapper (obj) {
        return(
            
        <div className='image-container'>
            <img className='current-user-feed-image' src={obj.image_url} imageId={obj.id} imageObj={{obj}} onClick={(e) => {imageClick(e)}} />
        </div>)
    }



    return(
        <>
        <div className='home-feed-container'>
            <div className='home-feed-header'>
                <h1>A Look at</h1>
                <h2>{userLocationName}  </h2>    
            </div>
            <div className='home-image-feed'>
                {currentLocationInfo ? currentLocationInfo.map(imageMapper) : ''}
                
            </div>
        </div>
        </>
    )
}

export default HomePageFeed;