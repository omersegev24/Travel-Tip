var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function getLocByName(locName) {
    const API_KEY = 'AIzaSyCS9KKJZD6rGF93tIgOd3qqW8GNz4oZIBA'
    var location = {}
    var prmLocation = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locName}&key=${API_KEY}`)
        .then(res => {
            console.log(res)
            location.address = res.data.results[0].formatted_address
            var geo = res.data.results[0].geometry.location
            location.lat = geo.lat
            location.lng = geo.lng
            return location
        })
    return prmLocation
}


export const locService = {
    getLocs,
    getPosition,
    getLocByName
}