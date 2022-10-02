import iconRender from "../hooks/iconRender";

function EachHourCard ({eachHour, localIcon, iconNum}) {
    let d = new Date(eachHour.DateTime)

    const options = {hour12 : 'true'}
    return( 
        <>
        <div className='hour-forcast'>
            <h6>{d.toLocaleString('en-US', options)}</h6>
            <h6>{eachHour.Temperature.Value}</h6>
            <i class={iconRender(eachHour.WeatherIcon, "fa-2x")}></i>
        </div>
        </>
    )
}

export default EachHourCard;