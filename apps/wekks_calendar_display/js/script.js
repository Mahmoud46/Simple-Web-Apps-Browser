let currentDate = document.querySelector('.current-date'),
    daysTag = document.querySelector('.days'),
    prevNextIcon = document.querySelectorAll('.icons i');
let date = new Date(),
    currentYear = date.getFullYear(),
    months = ['January', "February", 'March', "April", "May", 'June', "July", 'August', "September", "October", "November", "December"],
    currentMonth = date.getMonth();

let renderCalender = _ => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(),   // getting first day of month
        lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),  // getting last date of month
        lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(),  // getting last day of month
        lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate(),  // getting last date of previous month
        liTag = '';
    for (let i = firstDayOfMonth; i > 0; i--) {  // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {  // creating li of all days of current month
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth()
            && currentYear === new Date().getFullYear() ? 'active' : "";
        liTag += `<li class='${isToday}'>${i}</li>`;
    }
    for (let i = lastDayOfMonth; i < 6; i++) {  // crating li of next month first days
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
};

renderCalender();

prevNextIcon.forEach(icon => {
    icon.addEventListener('click', _ => {
        currentMonth = icon.id === 'next' ? currentMonth + 1 : currentMonth - 1;
        if (currentMonth < 0 || currentMonth > 11) {  // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear();  // update current year with new date year
            currentMonth = date.getMonth();    // update current month with new date month
        } else {
            date = new Date();
        }
        renderCalender();
    });
});