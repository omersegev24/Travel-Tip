'use strict;'

export const weatherService = {
    getWeather,

}

const KEY = '296b1122b96bcab669d0beb757487874';

var pos = { lat: 32.0749831, lng: 34.9120554 }


function getWeather(pos) {

    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&appid=${KEY}`)
        .then(res => {
            console.log(res)
        })
}
