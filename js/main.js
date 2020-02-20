
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'
import { utilsService } from './services/util.service.js';


window.onload = () => {
    mapService.initMap()
        .then(pos => {
            mapService.centerMap(pos.latitude, pos.longitude);
            mapService.addMarker({ lat: pos.latitude, lng: pos.longitude })
            weatherService.getWeather(pos)
                .then(renderWeather)
            renderLocDetailsUrl()
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}


document.querySelector('.my-loc-btn').addEventListener('click', () => {
    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
            mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude })
            weatherService.getWeather(pos.coords)
                .then(renderWeather)
        })
})


document.querySelector('.go-btn').addEventListener('click', () => {
    var locationTxt = document.querySelector('.location-input').value
    if (!locationTxt) return;
    locService.getLocByName(locationTxt)
        .then(loc => {
            mapService.panTo(loc.lat, loc.lng)
            mapService.addMarker({ lat: loc.lat, lng: loc.lng })
            weatherService.getWeather({ latitude: loc.lat, longitude: loc.lng })
                .then(renderWeather)
            renderLocDetails(loc)
        })
        .catch(err => {
            console.log('address not found', err)
        })
})

document.querySelector('.copy-btn').addEventListener('click', () => {
    var copyText = document.querySelector(".copy-input");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");

})

function renderWeather(weather) {

    var strHTML = `<div class="weather-card">
                        <p class="head-line">Weather today</p>
                        <img src="${weather.icon}" alt="">
                        <p class="address">${weather.address}, ${weather.country}</p>
                        <p class="temp">Temp: ${weather.temp}℃</p>
                        <p class="wind">Wind speed: ${weather.wind} m/s</p>
                        <p class="feels-like">Feels like: ${weather.feelsLike}℃</p>
                        <p class="min-temp">Temperature from ${weather.tempMin}℃ to ${weather.tempMax}℃</p>
                    </div>`;
    document.querySelector('.weather-container').innerHTML = strHTML
}

function renderLocDetails(loc) {
    document.querySelector('.loc-details span').innerText = loc.address;
    document.querySelector('.copy-input').value = `https://omersegev24.github.io/Travel-Tip/index.html?lat=${loc.lat}&lng=${loc.lng}&name=${loc.address}`
    document.querySelector('.location-input').value = ''
}

function renderLocDetailsUrl() {
    var locDetailsTxt = utilsService.getParameterByName('name')
    if (locDetailsTxt) {
        document.querySelector('.loc-details span').innerText = locDetailsTxt
    }
}