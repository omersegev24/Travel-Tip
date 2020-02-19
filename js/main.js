console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'
import { utilsService } from './services/util.service.js'



window.onload = () => {
    mapService.initMap()
        .then(() => {
            locService.getPosition()
                .then(pos => {
                    mapService.centerMap(pos.coords.latitude, pos.coords.longitude);
                    mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                    weatherService.getWeather(pos.coords)
                        .then(renderWeather)
                })
                .catch(err => {
                    console.log('err!!!', err);
                })
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

document.querySelector('.go-btn').addEventListener('click', (ev) => {
    var locationTxt = document.querySelector('.location-input').value
    locService.getLocByName(locationTxt)
        .then(loc => {
            mapService.panTo(loc.lat, loc.lng)
            mapService.addMarker({ lat: loc.lat, lng: loc.lng })
            renderLocDetails(loc)
        })
        .catch(err => {
            console.log('missing city', err)
        })
})



function renderWeather(weather) {

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

function renderLocDetails(loc) {
    document.querySelector('.loc-details').innerText = `Location: ${loc.address}`
    document.querySelector('.copy-input').value = `https://omersegev24.github.io/Travel-Tip/index.html?lat=${loc.lat}&lng=${loc.lng}`
}
