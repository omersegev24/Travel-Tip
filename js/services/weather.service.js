'use strict;'

export const weatherService = {
    getWeather,

}

const KEY = '296b1122b96bcab669d0beb757487874';


function getWeather(pos) {
    console.log(location.protocol);
   
    var prmWeather = axios.get(`${location.protocol}//api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&units=metric&appid=${KEY}`)
        .then(res => {
            return {
                address: res.data.name,
                country: res.data.sys.country,
                temp: Math.ceil(res.data.main.temp),
                feelsLike: Math.ceil(res.data.main.feels_like),
                tempMin: Math.ceil(res.data.main.temp_min),
                tempMax: Math.ceil(res.data.main.temp_max),
                wind: Math.ceil(res.data.wind.speed),
                icon: `${location.protocol}//openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png` 
            }
        })
    return prmWeather;
}
