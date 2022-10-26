function iconRender (iconNum) {
    if (iconNum <= 2 ) {
        return `fa-solid fa-2x fa-sun`
    } else if (iconNum <= 5) {
        return `fa-solid fa-2x fa-cloud-sun`
    } else if (iconNum <= 8 || iconNum === 11 || iconNum === 37 || iconNum === 38) {
        return `fa-solid fa-2x fa-cloud`
    } else if (iconNum <= 13 || iconNum === 18|| iconNum === 40){
        return `fa-solid fa-2x fa-cloud-rain`
    } else if (iconNum === 14 || iconNum === 17) {
        return `fa-solid fa-2x fa-cloud-sun-rain`
    } else if (iconNum <= 16 || iconNum === 41 || iconNum === 42) {
        return `fa-solid fa-2x fa-cloud-bolt`
    } else if (iconNum === 30) {
        return `fa-solid fa-2x fa-temperature-full`
    } else if (iconNum === 32) {
        return `fa-solid fa-2x fa-wind`
    } else if (iconNum === 33 || iconNum === 34) {
        return `fa-solid fa-2x fa-moon`
    } else if (iconNum === 35 || iconNum === 36) {
        return `fa-solid fa-2x fa-cloud-moon`
    } else if (iconNum === 39) {
        return `fa-solid fa-2x fa-cloud-moon-rain`
    }
}

export default iconRender;