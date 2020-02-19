console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'
import { utilsService } from './services/util.service.js'



locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {

            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            mapService.centerMap(pos.coords.latitude, pos.coords.longitude); // daniel
            weatherService.getWeather(pos.coords)
                .then(renderWeather)
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}



document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
            mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            weatherService.getWeather(pos.coords)
                .then(renderWeather)
        })
})

document.querySelector('.copy-btn').addEventListener('click', (ev) => {
    
})


function renderWeather(weather) {
    console.log(weather)
    var strHTML = `<div class="weather-card">
                        <img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="">
                        <p class="address">${weather.address}</p>
                        <p class="country">${weather.country}</p>
                        <p class="temp">Temp: ${weather.temp}℃</p>
                        <p class="wind">Wind speed: ${weather.wind} m/s</p>
                        <p class="feels-like">Feels like: ${weather.feelsLike}℃</p>
                        <p class="min-temp">From ${weather.tempMin}℃ to ${weather.tempMax}℃</p>
                    </div>`;
    document.querySelector('.weather-container').innerHTML = strHTML
}



// locService.getLocByName('bacher tel aviv 4')
//     .then(res => console.log(res))
