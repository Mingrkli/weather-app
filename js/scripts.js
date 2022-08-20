const app = document.querySelector('.weather-app')

const temp = document.querySelector('.temp')
const dateOutput = document.querySelector('.date')
const timeOutput = document.querySelector('.time')
const conditionOutput = document.querySelector('.condition')
const nameOutput = document.querySelector('.name')
const icon = document.querySelector('.icon')

const cloudOutput = document.querySelector('.cloud')
const humidityOutput = document.querySelector('.humidity')
const windOutput = document.querySelector('.wind')

const from = document.querySelector('#locationInput')
const search = document.querySelector('.search')
const btn = document.querySelector('.submit')
const cities = document.querySelectorAll('.city')

// Default city
let cityInput = 'London';

// Event listener for each city in panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        // Change the city
        cityInput = e.target.innerHTML;
        // fetch date we need form the weather API
        fetchWeatherData();
        // Fade out app
        app.style.opacity = '0'
    })
})

// Submit
from.addEventListener('submit', (e) => {
    // If empty, show and alert
    if (search.value.length === 0) {
        alert('Please type in a city name')
    }
    else {
        // change the city
        cityInput = search.value;
        // fetch date we need form the weather API
        fetchWeatherData();
        // Remove text from search
        search.value = '';
        app.style.opacity = '0';
    }

    // Prevents default behavior
    e.preventDefault();
})

// returns  a day of the week from a date
function dayOfTheWeek(day, month, year) {
    const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    return weekday[new Date(`${month}/${day}/${year}`).getDay()]
}

// fetches the Weather API
function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=8ae77fa843ab4e749a540752222008&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data)

        // Temp and weather condition
        temp.innerHTML = data.current.temp_c + '&#176';
        conditionOutput.innerHTML = data.current.condition.text;

        // Get date and time
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        // Reformat the date into something more appealing
        // Original format: 2021-10-09 17:53
        // New Format: 17:53 - Friday 9, 10 2021
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;
        // City name
        nameOutput.innerHTML = data.location.name;
        // Gets the icon for the weather and extract a part of it
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64".length);
        // Reformat the icon url into local folder path
        icon.src = "./icons/" + iconId;

        // Add weather details
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";

        // Set default time of dat
        let timeOfDay = 'day';
        // Get unique id for each weather condition
        const code = data.current.condition.code;

        // Change to night if its night time in the city
        if (!data.current.is_day) {
            timeOfDay = 'night';
        }

        if (code === 1000) {
            // clear
            app.style.backgroundImage = `url(images/${timeOfDay}/clear.jpg)`

            // night
            if (timeOfDay === 'night') {
                btn.style.background = '#181e27'
            }
        }

        // Cloudy
        else if (
            code === 1003 ||
            code === 1006 ||
            code === 1009 ||
            code === 1030 ||
            code === 1069 ||
            code === 1087 ||
            code === 1135 ||
            code === 1273 ||
            code === 1276 ||
            code === 1279 ||
            code === 1282
    
        ) {
            app.style.backgroundImage = `url(images/${timeOfDay}/cloudy.jpg)`;
            btn.style.color = 'black'
            btn.style.background = 'cyan';
            // night
            if (timeOfDay === 'night') {
                btn.style.color = '#fff'
                btn.style.background = '#111'
            }
        }

        // Rainy
        else if (
            code === 1063 ||
            code === 1069 ||
            code === 1072 ||
            code === 1150 ||
            code === 1153 ||
            code === 1180 ||
            code === 1183 ||
            code === 1186 ||
            code === 1189 ||
            code === 1192 ||
            code === 1195 ||
            code === 1204 ||
            code === 1207 ||
            code === 1240 ||
            code === 1243 ||
            code === 1246 ||
            code === 1246 ||
            code === 1249 ||
            code === 1252
    
        ) {
            app.style.backgroundImage = `url(images/${timeOfDay}/rainy.jpg)`;
            btn.style.background = '#647d75';
            // night
            if (timeOfDay === 'night') {
                btn.style.background = '#325c80'
            }
        }

        // Snow
        else {
            app.style.backgroundImage = `url(images/${timeOfDay}/snowy.jpg)`;
            btn.style.background = '#4d72aa';
            // night
            if (timeOfDay === 'night') {
                btn.style.background = '#1b1b1b'
            }
        }

        // fade in the page once is all done
        app.style.opacity = '1';
    })
}

// call function when page loads
fetchWeatherData();

// fade in the page
app.style.opacity = '1'