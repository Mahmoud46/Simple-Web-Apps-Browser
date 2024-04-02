let deg = 6,
    hr = document.getElementById('hr'),
    mn = document.getElementById('mn'),
    sc = document.getElementById('sc');


setInterval(_ => {
    getTime();
    let day = new Date(),
        hh = day.getHours() * 30,
        mm = day.getMinutes() * deg,
        ss = day.getSeconds() * deg;

    hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
}, 1000);


function getTime() {
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let day = new Date(),
        h = day.getHours(),
        m = day.getMinutes(),
        s = day.getSeconds(),
        st = 'PM';
    if (h > 12) {
        h -= 12;
        if (h < 10) h = `0${h}`;
        st = "PM";
    } else st = "AM";
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    document.querySelector('.time').innerHTML = `${h}:${m}:${s} <i>${st}</i>`;
    document.querySelector('.day').innerHTML = `${weekdays[day.getDay()]}, ${months[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}`;
}