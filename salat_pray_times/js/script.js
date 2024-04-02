let prayTimes = [{ en: 'Fajr', ar: 'الفجر' }, { en: 'Dhuhr', ar: 'الظهر' }, { en: 'Asr', ar: 'العصر' }, { en: 'Maghrib', ar: 'المغرب' }, { en: 'Isha', ar: 'العشاء' }],
    timesCont = document.querySelector('.times');
timesCont.innerHTML = '';
fetch(`http://api.aladhan.com/v1/timingsByCity?city=Giza&country=Egypt&method=5`).then(res => res.json()).then(data => {
    console.log(data);
    document.querySelector('.day').innerHTML = `<span>${data.data.date.gregorian.weekday.en}</span> <span>${data.data.date.hijri.weekday.ar}</span>`;
    document.querySelector('.date.hj').innerText = `${data.data.date.hijri.month.ar} - ${data.data.date.hijri.month.en} ${data.data.date.hijri.day},  ${data.data.date.hijri.year}`;
    document.querySelector('.date.ac').innerText = `${data.data.date.gregorian.month.en} ${data.data.date.gregorian.day},  ${data.data.date.gregorian.year}`;
    console.log(data.data.timings);
    prayTimes.forEach(ele => {
        let h = parseInt(data.data.timings[ele.en].split(":")[0]),
            m = parseInt(data.data.timings[ele.en].split(":")[1]),
            ampm = h > 12 ? "PM" : "AM",
            h_mod = h > 12 ? h - 12 < 10 ? `0${h - 12}` : h - 12 : h < 10 ? `0${h}` : h,
            m_mod = m > 10 ? m : `0${m}`;
        timesCont.innerHTML += `<p class='next'><span>${ele.en} &#160 ${ele.ar}</span><span>${h_mod} : ${m_mod}<i>${ampm}</i></span></p>`;
    })
});

