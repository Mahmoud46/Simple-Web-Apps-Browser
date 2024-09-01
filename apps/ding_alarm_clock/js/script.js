let currenTime = document.querySelector('h1'),
    selectMinue = document.querySelectorAll('select'),
    setAlarmBtn = document.querySelector('button'),
    content = document.querySelector('.content'),
    alarmWindow = document.querySelector('.ring');
let alarmTime, isAlarmSet = false,
    ringTone = new Audio('./audios/ringtone.mp3');

for (let i = 12; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMinue[0].firstElementChild.insertAdjacentHTML('afterend', option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMinue[1].firstElementChild.insertAdjacentHTML('afterend', option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? 'AM' : 'PM';
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMinue[2].firstElementChild.insertAdjacentHTML('afterend', option);
};

setInterval(_ => {
    let date = new Date(),
        h = date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = date.getHours() >= 12 ? "PM" : "AM";
    h = h > 9 ? h : `0${h}`;
    m = m > 9 ? m : `0${m}`;
    s = s > 9 ? s : `0${s}`;
    currenTime.innerHTML = `${h}:${m}:${s} <span>${ampm}</span>`;

    if (alarmTime == `${h}:${m} ${ampm}`) {
        ringTone.play();
        ringTone.loop = true;
        showAlarmWindow(true);
    }
}, 1000);

let setAlarm = _ => {
    if (isAlarmSet) {  // if alarm set is true
        alarmTime = "";  // clear the value of alarmTime
        ringTone.pause();  // pause the ringtone
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;  // return isAlarm value to false
    }

    let time = `${selectMinue[0].value}:${selectMinue[1].value} ${selectMinue[2].value}`;
    if (time.includes('Hour') || time.includes('Minutes') || time.includes('AM/PM')) {
        return alert('Please, select a valid time to set alarm!');
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add('disable');
    setAlarmBtn.innerText = "Clear Alarm";
}
setAlarmBtn.addEventListener('click', setAlarm);


function showAlarmWindow(showAlarm) {
    showAlarm ? alarmWindow.classList.contains('active') ? '' : alarmWindow.classList.add('active') : '';
}

alarmWindow.querySelectorAll('span')[2].addEventListener('click', _ => {
    alarmWindow.classList.remove('active');
    setAlarmBtn.click();
});