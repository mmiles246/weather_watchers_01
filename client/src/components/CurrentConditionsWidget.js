import WidgetToggle from "./WidgetToggle";

function CurrentConditionsWidget ({userLocationName, currentConditions, iconNum, triggerLocation, localIcon, widgetToggle, setWidgetToggle}) {

    return (
        <>
        <div className='temp-widget-container'>
            
            <div className="temp-widget">
                <div className='toggle'>
                <WidgetToggle widgetToggle={widgetToggle} setWidgetToggle={setWidgetToggle} />
                </div>
                    <div className='temp-widget-deets'>
                        <div className='temp-widget-location'>
                            {userLocationName ? <span>{userLocationName}</span> : <></>}
                        </div>
                        <div className="temp-widget-icon">
                            <i class={ !iconNum ? "fa-solid fa-3x fa-location-arrow" : localIcon(iconNum)} onClick={triggerLocation}></i>  
                        </div>
                        <div className="local-temp">
                            {iconNum ? <span>{currentConditions.Temperature.Imperial.Value}</span> : <></>}
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
}

export default CurrentConditionsWidget;