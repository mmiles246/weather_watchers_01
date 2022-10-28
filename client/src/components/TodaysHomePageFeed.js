import { Data } from '@react-google-maps/api';
import { useState, useEffect } from 'react'

function TodaysHomePageFeed ({imageClick, clickedImageUrl, setClickedImageUrl, clickedImageID, setClickedImageId, isMounted, imageObjsMapper}) {
    const [todaysTopPosts, setTodaysTopPosts] = useState([])

    let today = new Date()

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0')
    }

    function formatDate (date) {

        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-')

    }
    let todayFormatted = formatDate(today)
    
    console.log(todayFormatted)

    useEffect(() => {
        fetch(`/todays-top-posts`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTodaysTopPosts(data)
        })
    }, [])

    return(
    <>
    <div className='home-feed-container'>
            <div className='home-feed-header'>
                <h1>A Look at</h1>
                <h2>Todays Posts</h2>    
            </div>
            <div className='home-image-feed'>
                {todaysTopPosts ? todaysTopPosts.map(imageObjsMapper) : ''}
            </div>
    </div>
    </>
    )
}

export default TodaysHomePageFeed;