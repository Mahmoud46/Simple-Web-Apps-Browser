let showTime = _ => {
    let time = new Date(),
        h = time.getHours(),
        m = time.getMinutes(),
        s = time.getSeconds(),
        year = time.getFullYear(),
        st = '';

    // to get the name of the day
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dayName = days[time.getDay()],
        day = parseInt(String(time.getDate()).padStart(2, '0')),
        month = parseInt(String(time.getMonth() + 1).padStart(2));

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
    // format hour, minute, second values
    h < 10 ? h = `0${h}` : h;
    m < 10 ? m = `0${h}` : m;
    s < 10 ? s = `0${h}` : s;

    // format day and month values
    day < 10 ? day = `0${day}` : day;
    month < 10 ? month = `0${month}` : month;


    document.getElementById('name').innerText = dayName;
    document.getElementById('day-num').innerText = day;
    document.getElementById('month-num').innerText = month;
    document.getElementById('year-num').innerText = year;

    // time
    document.getElementById('hrs').innerText = h;
    document.getElementById('min').innerText = m;
    document.getElementById('sec').innerText = s;
    document.querySelector('.time-zone span').innerText = st;

    document.getElementById('month-name').innerText = monthNames[parseInt(month - 1)];

}
showTime();
setInterval(showTime, 1000);