class Task {
    static tasksCounter = Task.tasksContainer = localStorage.getItem('tasksCounter');
    constructor(content) {
        this.taskContent = content;
        ++Task.tasksCounter
        this.taskId = this.getID();
        this.taskCard =
            `
                <div class="task-head">
                    <p class="day-name">${this.getDay()}</p>
                    <p class="day-date">${this.getDate()}</p>
                    <p class="day-time">${this.getTime()}</p>
                </div>
                <div class="task-body">
                    <div class="task-content">
                        <p class="task-title">${this.taskContent.length > 20 ? this.taskContent.slice(0, 15) + '....' : this.taskContent}</p>
                    </div>
                    <div class="task-controls">
                        <div class="delete">
                        <span class="material-symbols-outlined">
                        playlist_remove
                        </span>
                        </div>
                        <div class="checked">
                        <span class="material-symbols-outlined">
                        done
                        </span>
                        </div>
                    </div>
                </div>
            
        `;
        window.localStorage.setItem('tasksCounter', Task.tasksCounter);
        this.done = false;
    }
    getID() {
        let date = new Date();
        return date.getTime();
    }
    getDay() {
        let date = new Date();
        let days = ["Sunday", "Monday", "Tuesday", 'Wednesday', 'Thusrday', "Friday", "Saturday"];
        let dayIndex = date.getDay();
        return days[dayIndex].toUpperCase();
    }
    getDate() {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            date = new Date(),
            monthName = months[date.getMonth()],
            dayNum = date.getDate(),
            year = date.getFullYear();
        return `${monthName} ${dayNum},${year}`;
    }
    getTime() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let timeStat = hours >= 12 ? 'PM' : "AM";
        hours = hours > 12 ? hours - 12 : hours;
        hours = hours > 9 ? hours : `0${hours}`;
        minutes = minutes > 9 ? minutes : `0${minutes}`;
        seconds = seconds > 9 ? seconds : `0${seconds}`;
        return `${hours}:${minutes}:${seconds} ${timeStat}`;
    }
};


let taskInput = document.querySelector('.header .list-controls input');
let addBtn = document.querySelector('.header .list-controls button');
let tasksContainer = document.querySelector('.container .tasks-container');
let counter = document.getElementById('tasks-counter');

let addTask = _ => {
    // input validation
    if (taskInput.value !== "") {
        addTaskToArray(taskInput.value);
        taskInput.value = "";
    }
}


addBtn.addEventListener('click', _ => {
    addTask();
});
document.addEventListener('keypress', e => {
    if (e.key === 'Enter')
        addTask()
});






// 
let taskList = [];
incDecShowCounter(taskList.length);
if (localStorage.getItem('tasks')) {
    taskList = JSON.parse(localStorage.getItem('tasks'));
    incDecShowCounter(taskList.length);
}
//
getDataFromLocalStorage();
// 



function addTaskToArray(taskContent) {
    let task = new Task(taskContent);
    // Push tasks into taskList
    taskList.push(task);
    incDecShowCounter(taskList.length);
    // Add tasks cards to the tasks container
    addElementsToTaskContainerFrom(taskList);
    // Add tasks to local storage
    addDataToLoacalStorageFrom(taskList);
};

function addElementsToTaskContainerFrom(tasksArray) {
    tasksContainer.innerHTML = "";
    tasksArray.forEach(task => {
        // Add tasks to tasks container
        let taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.id = task.taskId;
        taskCard.innerHTML = task.taskCard;
        tasksContainer.appendChild(taskCard);
        let checkBtn = taskCard.querySelector('.checked');
        if (task.done) {
            taskCard.classList.add('done');
            checkBtn.classList.add('done');
        }
    });

    // Delete Card
    tasksArray.forEach(ele => {
        let card = document.getElementById(`${ele.taskId}`);
        let deleteBtn = card.querySelector('.delete');
        let taskBody = card.querySelector('.task-body');
        deleteBtn.addEventListener('click', _ => {
            taskBody.parentElement.remove();
            deleteTaskWith(ele.taskId);
            Task.tasksCounter = taskList.length;
            incDecShowCounter(taskList.length);
            localStorage.setItem('tasksCounter', Task.tasksCounter);
        })

        // check done card
        let checkBtn = card.querySelector('.checked');
        checkBtn.addEventListener('click', _ => {
            if (ele.done) {
                ele.done = false;
                card.classList.remove('done');
                checkBtn.classList.remove('done');
            }
            else {
                ele.done = true;
                card.classList.add('done');
                checkBtn.classList.add('done');
            }
            addDataToLoacalStorageFrom(tasksArray);
        });

    });
};

function addDataToLoacalStorageFrom(tasksArray) {
    window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
};


function getDataFromLocalStorage() {
    let data = window.localStorage.getItem('tasks')
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToTaskContainerFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    taskList = taskList.filter(r => r.taskId !== taskId);
    addDataToLoacalStorageFrom(taskList);
}

function incDecShowCounter(length) {
    counter.innerText = length < 10 ? `0${length}` : length;
}

