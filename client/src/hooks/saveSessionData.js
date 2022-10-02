import { useState, useEffect } from "react";
import getSessionData from "./getSessionData";

function saveSessionData (key, defaultValue) {
    const [value, setValue] = useState(getSessionData(key, defaultValue));

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue];
}

export default saveSessionData;
