import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom'


function HomePageFeed ({userLocationName, placeId, currentUser, clickedImageId, setClickedImageId, clickedImageUrl, setClickedImageUrl, clickedImage, setClickedImage, imageClick, isMounted, currentLocationInfo}) {
    // const [currentLocationInfo, setCurrentLocationInfo]=useState([])

    // const isMounted = useRef(false)

    let navigate = useNavigate()

    // console.log(currentLocationInfo)

    // useEffect(() => {
    //     fetch(`/location-placeId/${placeId}`)
    //     .then(res => {
    //         if (res.ok) {
    //             res.json().then(data => {
    //                 console.log(data)
    //                 setCurrentLocationInfo(data)
    //             })
    //         }
    //     })
    // }, [placeId])

    useEffect(() => {
        if (isMounted.current) {
            navigate(`/image/${clickedImageId}`, {state: clickedImageId})
            isMounted.current = false
        } else {
            isMounted.current = false
        }
    }, [clickedImageId])

    // function imageClick (e) {
    //     setClickedImageId(parseInt(e.target.getAttribute('imageId')))
    //     setClickedImageUrl(e.target.getAttribute('src'))
    //     setClickedImage(imageObjs.find(obj => obj.id === parseInt(e.target.getAttribute('imageId'))))
    //     isMounted.current = true
    // }


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
                {/* if(currententLocationInfo) {
                currentLocationInfo.map(imageObjsMapper)
                } else {} */}
                {currentLocationInfo ? currentLocationInfo.map(imageMapper) : ''}
                
            </div>
        </div>
        </>
    )
}

export default HomePageFeed;