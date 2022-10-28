import FeedPage from "./FeedPage";
import HomePageBanner from "./HomePageBanner";
import HomePageFeed from "./HomePageFeed";
import TodaysHomePageFeed from "./TodaysHomePageFeed";


function Home ({userLocationKey, userLocationName, userState, currentConditions, triggerLocation, locate, iconNum, placeId, currentUser, clickedImageId, setClickedImageId, clickedImageUrl, setClickedImageUrl, imageClick, isMounted, currentLocationInfo, imageObjsMapper}) {

    console.log(placeId)
    return (
        <>
            <div className="home--primary">
                <div className="header-banner">
                        <HomePageBanner 
                        userLocationKey={userLocationKey} 
                        currentConditions={currentConditions} 
                        userLocationName={userLocationName} 
                        userState={userState}
                        triggerLocation={triggerLocation} 
                        locate={locate} 
                        iconNum={iconNum}
                        />
                        {/* <HomePageFeed 
                        userLocationName={userLocationName} 
                        currentConditions={currentConditions}
                        placeId={placeId}
                        currentUser={currentUser} 
                        clickedImageId={clickedImageId} 
                        setClickedImageId={setClickedImageId} 
                        clickedImageUrl={clickedImageUrl} 
                        setClickedImageUrl={setClickedImageUrl} 
                        imageClick={imageClick} 
                        isMounted={isMounted}
                        currentLocationInfo={currentLocationInfo}
                        /> */}

                        <TodaysHomePageFeed 
                        imageClick={imageClick}
                        clickedImageUrl={clickedImageUrl}
                        setClickedImageUrl={setClickedImageUrl}
                        clickedImageId={clickedImageId}
                        setClickedImageId={setClickedImageId}
                        isMounted={isMounted}
                        imageObjsMapper={imageObjsMapper}
                         />
                </div>
            </div>
        </>
    )

}

export default Home;