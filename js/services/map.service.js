import { utilsService } from "./util.service.js";
import { locService } from './loc.service.js';

export const mapService = {
    initMap,
    addMarker,
    panTo,
    centerMap
}


var gMap;

function initMap() {
    var lat;
    var lng;
    var latFromUrl = +utilsService.getParameterByName('lat')
    var lngFromUrl = +utilsService.getParameterByName('lng')
    if(latFromUrl && lngFromUrl){
        lat = latFromUrl
        lng = lngFromUrl
    } else {
        locService.getPosition()
            .then(res => {
                lat = res.coords.latitude
                lng = res.coords.longitude
            })
    }

    return _connectGoogleApi() 
        .then(() => {
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            return {latitude: lat, longitude: lng}
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);

    gMap.setZoom(17);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCS9KKJZD6rGF93tIgOd3qqW8GNz4oZIBA';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



function centerMap(lat, lng) {
    gMap.setCenter({ lat: lat, lng: lng });
    gMap.setZoom(14);
}