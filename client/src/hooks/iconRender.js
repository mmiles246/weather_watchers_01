function iconRender (iconNum, iconSize) {
    if (iconNum <= 2 ) {
        return `fa-solid ${iconSize} fa-sun`
    } else if (iconNum <= 5) {
        return `fa-solid ${iconSize} fa-cloud-sun`
    } else if (iconNum <= 8 || iconNum === 11 || iconNum === 37 || iconNum === 38) {
        return `fa-solid ${iconSize} fa-cloud`
    } else if (iconNum <= 13 || iconNum === 18|| iconNum === 40){
        return `fa-solid ${iconSize} fa-cloud-rain`
    } else if (iconNum === 14 || iconNum === 17) {
        return `fa-solid ${iconSize} fa-cloud-sun-rain`
    } else if (iconNum <= 16 || iconNum === 41 || iconNum === 42) {
        return `fa-solid ${iconSize} fa-cloud-bolt`
    } else if (iconNum === 30) {
        return `fa-solid ${iconSize} fa-temperature-full`
    } else if (iconNum === 32) {
        return `fa-solid ${iconSize} fa-wind`
    } else if (iconNum === 33 || iconNum === 34) {
        return `fa-solid ${iconSize} fa-moon`
    } else if (iconNum === 35 || iconNum === 36) {
        return `fa-solid ${iconSize} fa-cloud-moon`
    } else if (iconNum === 39) {
        return `fa-solid ${iconSize} fa-cloud-moon-rain`
    }
}

export default iconRender;