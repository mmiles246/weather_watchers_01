import AccountPageBanner from "./AccountPageBanner";
import FeedPage from './FeedPage'
import CurrentUserFeed from "./CurrentUserFeed";
function UserAccountPage ({currentUser, clickedImageId, setClickedImageId, clickedImageUrl, setClickedImageUrl, clickedImage, setClickedImage, imageClick, isMounted, imageObjs}) {

    return(
        <>
        <AccountPageBanner />
        <CurrentUserFeed currentUser={currentUser} clickedImageId={clickedImageId} setClickedImageId={setClickedImageId} clickedImageUrl={clickedImageUrl} setClickedImageUrl={setClickedImageUrl} clickedImage={clickedImage} setClickedImage={setClickedImage} imageClick={imageClick} isMounted={isMounted} imageObjs={imageObjs} />
        </>
    )
}

export default UserAccountPage;