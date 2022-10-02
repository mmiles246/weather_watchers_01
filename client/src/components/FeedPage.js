import {useState, useEffect} from 'react'

function FeedPage () {
    const [imageObjs, setImageObjs] = useState([])

    // useEffect(() => {
    //     fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?`)
    //     .then()
    //     .then()
    // })

    // useEffect(() => {
    //     fetch('/my_posts')
    //     .then((res) => res.json())
    //     .then(res => {
    //         console.log(res)
    //         setImageObjs(res)
    //     })
    // }, [])

    console.log(imageObjs)
    // function imageObjsMapper (obj) {
    //     return(
    //     <div className='image-container'>
    //         <img className='current-user-feed-image' src={obj.image_url} />
    //     </div>)
    // }

    return (
        <>
        {/* <div className='feed-container'>
            <div className='feed-header'>
                <h1>Today's Popular Posts</h1>    
            </div>
            <div className='image-feed'>
                Images will be here
                <br></br>
                <br></br>
                    {imageObjs.map(imageObjsMapper)}
               
            </div>
        </div> */}
        </>
    )

}

export default FeedPage;