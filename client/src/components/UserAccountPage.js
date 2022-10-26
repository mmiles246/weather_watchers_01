import AccountPageBanner from "./AccountPageBanner";
import FeedPage from './FeedPage'
import CurrentUserFeed from "./CurrentUserFeed";
function UserAccountPage ({currentUser, clickedImageId, setClickedImageId, clickedImageUrl, setClickedImageUrl, clickedImage, setClickedImage, imageClick, isMounted, imageObjs, imageObjsMapper, userInfo, setUserInfo, dateOfLastPost, setDateOfLastPost, numOfPosts, diffInDate}) {

    return(
        <>
        <div className='feed-container'>
            <div className='feed-header'>
                <AccountPageBanner  currentUser={currentUser} userInfo={currentUser} numOfPosts={numOfPosts} diffInDate={diffInDate} />
                <CurrentUserFeed currentUser={currentUser} clickedImageId={clickedImageId} setClickedImageId={setClickedImageId} clickedImageUrl={clickedImageUrl} setClickedImageUrl={setClickedImageUrl} clickedImage={clickedImage} setClickedImage={setClickedImage} imageClick={imageClick} isMounted={isMounted} imageObjs={imageObjs} imageObjsMapper={imageObjsMapper} />
            </div>
        </div>
        </>
    )
}

export default UserAccountPage;