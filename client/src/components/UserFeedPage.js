import AccountPageBanner from './AccountPageBanner'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function UserFeedPage ({imageObjsMapper, isMounted, imageClick, clickedImageId, setClickedImageId}) {
    const [userObject, setUserObject] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [userAvatar, setUserAvatar] = useState()
    const [userInfo, setUserInfo] = useState({})
    const [lastPost, setLastPost] = useState({})
    const [dateOfLastPost, setDateOfLastPost] = useState()

    const location =  useLocation()
    const userObj = location.state

    let navigate = useNavigate()
    const numOfPosts = userPosts.length

    useEffect(()=> {
        fetch(`/user/${userObj.id}`)
        .then(res => res.json())
        .then(data => {
            setUserInfo(data)
            setUserAvatar(data.avatar_url)
        })
        fetch(`/users_posts/${userObj.id}`)
        .then(res => res.json())
        .then(data => {
            setUserPosts(data)
            // setLastPost(data.slice(-1))
            setDateOfLastPost(new Date(data.slice(-1)[0].created_at))
        })
        .then(lastPost => {
            // setDateOfLastPost(new Date(lastPost[0].created_at))
        })
    }, [])

    useEffect(() => {
        if (isMounted.current) {
            navigate(`/image/${clickedImageId}`, {state: clickedImageId})
            isMounted.current = false
            setClickedImageId(null)
        } else {
            isMounted.current = false
        }
    }, [imageClick])

    // const postDates = userPosts.map((post) => new Date(post.created_at))
    // console.log(postDates)

    let diffInDate=null

    if (dateOfLastPost) {

        const currentDate = new Date()
        const dayOfLastPost = dateOfLastPost
        const timeOfLastPost = dayOfLastPost.getTime()

        const diffInTime = currentDate.getTime() - timeOfLastPost
        diffInDate = Math.floor(diffInTime/(1000*3600*24))
    }

    // function lastPosted (lastPost) {

    //     // const dateOfLastPost = new Date(lastPost[0].created_at)
    //     // console.log(dateOfLastPost)

    //     const currentDate = new Date()

    //     const diffInTime = currentDate.getTime() - dateOfLastPost.getTime()
    //     const diffInDate = Math.floor(diffInTime/(1000*3600*24))

    //     return diffInDate;
    // }


    // function lastPosted (posts) {
    //     let diffInDate=null

    //     for (let i=0; i<postDates.length; i++) {
    //         const currentDate=new Date()
    //         const postDate=postDates[i]

    //         const diffInTime=currentDate.getTime() - postDate.getTime()
    //         diffInDate=Math.floor(diffInTime/(1000*3600*24))

    //         console.log(diffInDate)
    //     }

    //     return diffInDate;
    // }

    






    return(
        <>
        <div className="feed-container">
            <div className='feed-header'>
                <AccountPageBanner userAvatar={userAvatar} userInfo={userInfo} numOfPosts={numOfPosts} diffInDate={diffInDate} lastPost={lastPost}/>
                <div className='user-avatar'>
                    {/* {!currentUser.avatar_url ? <i class="fa-solid fa-user" onClick={() => setShow(true)}></i> : <img className='current-user-blank-avatar' src={currentUser.avatar_url} onClick={() => setShow(true)}/>} */}
                    {/* <img className={currentUser.avatar ? '' : ''}/> */}
                </div>
                <div className='current-user'>
                    {/* <h1>Hello</h1> */}
                </div>    
            </div>
            <div className='image-feed'>
                <br></br>
                {userPosts.map(imageObjsMapper)}
            </div>
        </div>
        </>
    )

}

export default UserFeedPage;