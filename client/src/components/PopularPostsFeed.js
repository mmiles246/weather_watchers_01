import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PopularPostsFeed ({imageObjsMapper, imageClick, isMounted, clickedImageId, setClickedImageId}) {
    const [popularPosts, setPopularPosts] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        fetch(`popular-posts`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPopularPosts(data)
        })
    }, [])

    useEffect(() => {
        if (isMounted.current) {
            navigate(`/image/${clickedImageId}`, {state: clickedImageId})
            isMounted.current = false
            setClickedImageId()
        } 
        // else {
        //     isMounted.current = false
        // }
    }, [imageClick])

    return(
    <>
    <div className='home-feed-container'>
        <div className='home-feed-header'>
            <h1>A Look at</h1>
            <h1>This Weeks Popular Posts</h1>
        </div>
        <div className='home-page-feed'>
            {popularPosts ? popularPosts.map(imageObjsMapper) : ''}
        </div>
    </div>
    </>
    )
}

export default PopularPostsFeed;