import { useState, useEffect } from 'react'

function DailyForcastWidget () {
    const [dailyForcastObj, setDailyForcastObj] = useState(null)

    useEffect (() => {
        fetch(``)
        .then()
        .then()
    }, [])

    return(
        <>
        <div className="daily-forcast-widget">
                    <div className='daily-forcast-location'>
                        {userLocationName ? <span>{userLocationName}</span> : <></>}
                    </div>
                    <div className="daily-forcast-icons">
                        <i class={ !iconNum ? "fa-solid fa-3x fa-location-arrow" : localIcon(iconNum)} onClick={triggerLocation}></i>  
                    </div>
                    <div className="daily-forcast-temps">
                        {iconNum ? <span>{currentConditions.Temperature.Imperial.Value}</span> : <></>}
                    </div>
                    
        </div>
        </>
    )
}

export default DailyForcastWidget;