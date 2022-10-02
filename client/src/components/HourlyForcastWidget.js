import { useState, useEffect } from 'react'
import EachHourCard from './EachHourCard'

function HourlyForcastWidget ({userLocationKey, localIcon, iconNum}) {
    const [hourlyForcastArray, setHourlyForcastArray] = useState([])

    useEffect (() => {
        fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${userLocationKey}?apikey=OsURg1PXKrkIswSEQHCGvY7yHyTJpVkP`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setHourlyForcastArray(res)
        })
    }, [userLocationKey])
    
    function hourlyForcastMapper (eachHour) {
        return <EachHourCard eachHour={eachHour} localIcon={localIcon} iconNum={iconNum} />
    }

    return(
        <>
            <div className="hourly-forcast-widget">
                <div className='hourly-forcast-card'>
                    {hourlyForcastArray.map(hourlyForcastMapper)}
                </div>
            </div>
            </>
    )

}

export default HourlyForcastWidget;