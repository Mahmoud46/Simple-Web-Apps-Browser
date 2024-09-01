let apiKey = '4400124b94398e8f0a20f1d400aefda7',
    timeZoneApiKey = 'b7206312bf7f4f14bba079303a058726';

let wrapper = document.querySelector('.wrapper'),
    inputPart = wrapper.querySelector('.input-part'),
    infoTxt = inputPart.querySelector('.info-txt'),
    inputField = inputPart.querySelector('input'),
    locationBtn = inputPart.querySelector('button'),
    wIcon = wrapper.querySelector('.weather-part span.weather-icn'),
    arrowBack = wrapper.querySelector('header span');

let api;

inputField.addEventListener('keyup', e => {
    // if user pressed enter btn and input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener('click', _ => {
    if (navigator.geolocation) {  // if the browser supports geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser doesn't support geolocation api");
    }
});

function onSuccess(position) {
    let { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}
function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add('error');
}
function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}
function fetchData() {
    infoTxt.innerText = "Getting weather details....";
    infoTxt.classList.add('pending');
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function weatherDetails(info) {
    infoTxt.classList.replace('pending', 'error');
    if (info.cod == '404') {
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }
    else {
        getTodaysDate(info.coord);
        // get required properties value from the info object
        let city = info.name,
            country = info.sys.country,
            { description, id } = info.weather[0],
            { feels_like, humidity, temp } = info.main;

        if (id == 800)
            wIcon.innerText = 'clear_day';
        else if (id >= 200 && id <= 232)
            wIcon.innerText = 'thunderstorm';
        else if (id >= 600 && id <= 622)
            wIcon.innerText = 'weather_snowy';
        else if (id >= 701 && id <= 781)
            wIcon.innerText = 'foggy';
        else if (id >= 801 && id <= 804)
            wIcon.innerText = 'partly_cloudy_day';
        else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531))
            wIcon.innerText = 'rainy';
        // pass these values to particular html element
        wrapper.querySelector('.temp .numb').innerText = Math.floor(temp);
        wrapper.querySelector('.location span').innerText = `${city}, ${country}`.toUpperCase();
        wrapper.querySelector('.weather').innerText = description.toUpperCase();
        wrapper.querySelector('.temp .numb-2').innerText = Math.floor(feels_like);
        wrapper.querySelector('.humidity .details span').innerText = `${humidity}%`;


        infoTxt.classList.remove('pending', 'error');
        wrapper.classList.add('active');
    }
}
arrowBack.addEventListener('click', _ => {
    inputField.value = '';
    wrapper.classList.remove('active');
});

function getTodaysDate(coordinates) {
    fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=PSI3FWR5TR5N&format=json&by=position&lat=${coordinates.lat}&lng=${coordinates.lon}`).then(res => res.json()).then(data => modDate(data));
}

function modDate(res) {
    // let dateTxt = res.date_time_txt.split(' ');
    // document.querySelector('.day-date').innerText = dateTxt.splice(0, 4).join(' ');
    // console.log(res);
    // modTime(dateTxt.splice(0, 4).join(' '));

    let { day, hour, millisecond, minute, month, second, year } = luxon.DateTime.now().setZone(res.zoneName).c,
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // console.log(modTime(luxon.DateTime.now().setZone(res.zoneName).toFormat("HH:mm:ss")))
    // console.log(luxon.DateTime.now().setZone(res.zoneName).c)
    document.querySelector('.day-date').innerText = `${months[month - 1]} ${day}, ${year}`;
    modTime(hour, minute, second)
}

function modTime(h, m, s) {
    let st = '';
    if (h > 12) {
        h -= 12;
        st = "PM"
    } else if (h >= 12 && m > 0 && s > 0) {
        st = "PM"
    }
    else {
        st = "AM";
        h = h;
    }

    h < 10 ? h = `0${h}` : h;
    m < 10 ? m = `0${h}` : m;
    s < 10 ? s = `0${h}` : s;

    document.querySelector('.day-time').innerText = `${h}:${m}:${s} ${st}`;
}
