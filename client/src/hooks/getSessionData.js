function getSessionData (key, defaultValue) {
    const data = sessionStorage.getItem(key)
    if (!data) {
      return defaultValue
    }
    return JSON.parse(data)
  }

export default getSessionData;