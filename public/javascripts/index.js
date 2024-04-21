async function searchForecast(e) {
    e.preventDefault();
    const input = document.getElementById('cityinput');
    const cityname = input.value;
    if (cityname == "") return;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=4278fa18d57947ee9f7213303242004&q=${cityname}&days=8&aqi=no&alerts=yes&lang=pt`;
    const response = await fetch(apiUrl);
    const data = response.json().then(d => fillWithData(d));
}

function fillWithData(data) {
    console.log(data)
    const { name, country } = data.location;
    const { temp_c, feelslike_c, humidity } = data.current;
    const { maxtemp_c, mintemp_c, daily_chance_of_rain } = data.forecast.forecastday[0].day;
    const { text, icon } = data.current.condition;
    document.getElementById('current-city').innerText = name + ", " + country;
    document.getElementById('weather-description').innerText = text;
    document.querySelector('#main-card img').src = "https:" + icon.replace('64x64', '128x128');
    document.querySelector('#current-degree span').innerText = temp_c;
    document.querySelector('#thermal-sensation span').innerText = feelslike_c;
    document.querySelector('#humidity span').innerText = humidity
    document.getElementById('max-temp').innerText = maxtemp_c;
    document.getElementById('min-temp').innerText = mintemp_c;
    document.querySelector('#rain-prob span').innerText = daily_chance_of_rain;

    fillNextHours(data);
    fillNextDays(data.forecast.forecastday)
}

function fillNextHours(data) {
    const datetime = new Date(data.current.last_updated_epoch * 1000);
    const forecastday = data.forecast.forecastday;
    for (i = datetime.getHours(); i < forecastday[0].hour.length; i++) {
        renderHourCard(forecastday[0].hour[i]);
    }
}

function renderHourCard(data) {
    const datetime = new Date(data.time_epoch * 1000);
    const card = document.createElement('div');
    card.classList.add('hour-card', 'd-flex', 'flex-column', 'justify-content-between');
    const hourP = document.createElement('p');
    let mins = parseInt(datetime.getMinutes()) < 10 ? "0"+datetime.getMinutes() : datetime.getMinutes();
    hourP.innerText = `${datetime.getHours()}:${mins}`;
    const img = document.createElement('img');
    let src = data.condition.icon.replace('64x64', '128x128');
    img.src = "https:" + src;
    const tempP = document.createElement('p');
    tempP.innerHTML = `<span>${data.temp_c}</span> ºc`;
    const desc = document.createElement('p');
    desc.innerText = data.condition.text;
    card.appendChild(hourP);
    card.appendChild(img);
    card.appendChild(tempP);
    card.appendChild(desc);
    document.querySelector('#next-hours').appendChild(card);

}

function fillNextDays(data) {
    for (i = 1; i < data.length; i++) {
        renderDayCard(data[i]);
    }
}

function renderDayCard(data) {
    const datetime = new Date(data.date_epoch * 1000);
    const card = document.createElement('div');
    card.classList.add('hour-card', 'd-flex', 'flex-column', 'justify-content-between');
    const dateP = document.createElement('p');
    dateP.innerText = `${datetime.getDay()}/${datetime.getMonth()}`;
    const img = document.createElement('img');
    let src = data.day.condition.icon.replace('64x64', '128x128');
    img.src = "https:" + src;
    const tempP = document.createElement('p');
    tempP.innerHTML = `<span>${data.day.avgtemp_c}</span> ºc`;
    const desc = document.createElement('p');
    desc.innerText = data.day.condition.text;
    card.appendChild(dateP);
    card.appendChild(img);
    card.appendChild(tempP);
    card.appendChild(desc);
    document.querySelector('#next-days').appendChild(card);

}

const searchBtn = document.getElementById('search');
search.addEventListener('click', searchForecast);

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchFromPosition);
    } else {
        console.log('geolocation not supported')
    }
}

async function fetchFromPosition(position) {
    coords = position.coords.latitude + "," + position.coords.longitude;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=4278fa18d57947ee9f7213303242004&q=${coords}&days=8&aqi=no&alerts=yes&lang=pt`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    fillWithData(data);
}

getCurrentLocation();