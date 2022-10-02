function WidgetToggle ({widgetToggle, setWidgetToggle} ) {

    function toggleWidget () {
        setWidgetToggle(!widgetToggle)
    }

    return(
        <>
        <div className='toggle-switch'>
            <input type='checkbox' name='toggleSwitch' id='toggleSwitch' onClick={toggleWidget} />
            <label className='toggle-switch-label' htmlFor='toggleSwitch' >
                Toggle
            </label>
        </div>
        </>
    )
}

export default WidgetToggle; 