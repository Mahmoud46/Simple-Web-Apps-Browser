
let showTime = _ => {
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    let year = time.getFullYear();
    let timeZone = "AM";
    h > 12 ? timeZone = "PM" : timeZone = "AM";
    h > 12 ? h = h - 12 : h = h;
    h < 10 ? h = "0" + h : h = h;
    m < 10 ? m = `0${m}` : m = m;
    s < 10 ? s = `0${s}` : s = s;

    // to get the name of the day
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = days[time.getDay()]

    let day = parseInt(String(time.getDate()).padStart(2, '0'));
    let month = parseInt(String(time.getMonth() + 1).padStart(2));
    day < 10 ? day = `0${day}` : day;
    month < 10 ? month = `0${month}` : month;


    document.getElementById('name').textContent = dayName;
    document.getElementById('day-num').textContent = day;
    document.getElementById('month-num').textContent = month;
    document.getElementById('year-num').textContent = year;

    // time
    document.getElementById('hrs').textContent = h;
    document.getElementById('min').textContent = m;
    document.getElementById('sec').textContent = s;
    document.getElementById('time-zone span').textContent = timeZone;

    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    document.getElementById('month-name').textContent = monthNames[time.getMonth()];

}
setInterval(showTime, 1000);