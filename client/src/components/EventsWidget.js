import { useState, useEffect} from 'react'

function EventsWidget ({userState, currentConditions}) {
    const [alertArray, setAlertArray] = useState([])
    const [actualAlerts, setActualAlerts] = useState([])

    // useEffect(() => {
    //     if (userState) {
    //         fetch(`https://api.weather.gov/alerts?active=truemessage_type=alert&area=${userState}`)
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.ok) {
    //                 setAlertArray(res.features)
    //             }
    //     })}
    // }, [userState])

        for (alert of alertArray) {
            let alertD = alert.properties.description;
            actualAlerts.push(alertD)
        }

    // console.log(actualAlerts)

    return(
        <>

        </>
    )

}

export default EventsWidget;
