let task_form = document.querySelector(".task_form"),
	form_header_text = document.querySelector(".form_header h1"),
	tasks_container = document.querySelector(".tasks_container"),
	task_date = document.getElementById("task_date"),
	task_time = document.getElementById("task_time"),
	task_title = document.getElementById("task_title"),
	task_description = document.getElementById("task_description"),
	today_btn = document.querySelector(".today_btn");

let tasks_list = [];

let task_flag = "create",
	edited_card_id = "",
	checked_tasks_counter = 0;

checked_tasks_counter = localStorage.getItem("checked_tasks_counter");
getDataFromLocalStorage();
// Get today
document.querySelector(".today_btn").addEventListener("click", (_) => {
	document.querySelector(".task_date").classList.toggle("inactive");
	document.querySelector(".today_btn").classList.toggle("active");
	let date = new Date();
	task_date.value = date.toISOString().split("T")[0];
});

// Activate create_update task window to create a new task
document.querySelector(".add_task").addEventListener("click", (_) => {
	task_form.classList.add("active");
	task_flag = "create";
	form_header_text.innerText = "Create task";
});

// Close create_update task window
document.querySelector(".close_btn").addEventListener("click", (_) => {
	task_form.classList.remove("active");
});

// Update or Create a task
document
	.querySelector(".create_update_task_btn")
	.addEventListener("click", (_) => {
		if (task_title.value != "" && task_date.value != "") {
			handleRequest();
			task_form.classList.remove("active");
		} else if (task_title.value == "") task_title.focus();
		else task_date.focus();
	});

function handleRequest() {
	if (task_flag == "create")
		createTask(
			task_title.value,
			task_date.value,
			task_time.value,
			task_description.value
		);
	else if (task_flag == "update")
		editTaskCard(
			task_title.value,
			task_date.value,
			task_time.value,
			task_description.value
		);
	clearTasksForm();
}

function createTask(
	task_title,
	task_date,
	task_time = "",
	task_description = ""
) {
	let task_info = {
		id: `tsk_${Math.round(Math.random() * 9000000)}`,
		task_title: task_title,
		task_description: task_description,
		task_date: task_date,
		task_time: task_time,
		checked: false,
	};

	tasks_list.push(task_info);
	addTaskToList();
}

function createTaskCard(task_info) {
	return `
		<div class="task_card ${task_info.checked ? "checked" : ""}" id="${
		task_info.id
	}">
					<span class="material-symbols-outlined check_btn">
						radio_button_unchecked
					</span>
					<div class="task_cont">
						<input type="text" title="${task_info.task_description}" readonly value="${
		task_info.task_title
	}" />
						<div class="more_info">
							<div class="time_cont">
								<span class="material-symbols-outlined"> event </span>
								<span>${changeDateFormat(task_info.task_date)}</span>
							</div>
							<div class="time_cont">
							${task_info.task_time == "" ? "" : "<span> - </span>"}
							</div>

							<div class="time_cont">
							${
								task_info.task_time == ""
									? ""
									: `<span class="material-symbols-outlined"> alarm </span>
								<span>${changeTimeFormat(task_info.task_time)}</span>`
							}
							</div>
						</div>
					</div>
					<div class="btns">
						<span class="material-symbols-outlined edit_btn"> edit </span>
						<span class="material-symbols-outlined delete_btn"> delete </span>
					</div>
				</div>
	`;
}

function checkTask(task_id, checked_value) {
	tasks_list.forEach((task) => {
		if (task.id == task_id) {
			task.checked = checked_value;
			if (task.checked) checked_tasks_counter++;
			else checked_tasks_counter--;
			document.getElementById("rst_tsk").innerText = `You have ${
				tasks_list.length - checked_tasks_counter
			} task(s) pending. Keep going!`;
		}
	});
	addTaskToList();
}

function editTaskCard(
	task_title,
	task_date,
	task_time = "",
	task_description = ""
) {
	tasks_list.forEach((task) => {
		if (task.id == edited_card_id) {
			task.task_title = task_title;
			task.task_description = task_description;
			task.task_date = task_date;
			task.task_time = task_time;
		}
	});
	addTaskToList();
}

function deleteTask(task_id) {
	let temp_list = [];
	for (let i = 0; i < tasks_list.length; ++i) {
		if (tasks_list[i].id == task_id) {
			if (tasks_list[i].checked) checked_tasks_counter--;
			continue;
		}
		temp_list.push(tasks_list[i]);
	}
	tasks_list = temp_list;
	addTaskToList();
}

function addTaskToList() {
	tasks_container.innerHTML = "";
	tasks_list.forEach((task_info) => {
		tasks_container.innerHTML += createTaskCard(task_info);
	});
	document.getElementById("rst_tsk").innerText = `You have ${
		tasks_list.length - checked_tasks_counter
	} task(s) pending. Keep going!`;
	document.querySelector(
		".hint"
	).innerText = `You have ${tasks_list.length} task(s) in your list.`;

	window.localStorage.setItem("checked_tasks_counter", checked_tasks_counter);
	addDataToLoacalStorageFrom(tasks_list);
	ActivateCardEvents();
}

function ActivateCardEvents() {
	document.querySelectorAll(".task_card")?.forEach((card) => {
		card.querySelector(".delete_btn").addEventListener("click", (_) => {
			deleteTask(card.getAttribute("id"));
		});

		card.querySelector(".edit_btn").addEventListener("click", (_) => {
			task_form.classList.add("active");
			task_flag = "update";
			form_header_text.innerText = "Update task";
			edited_card_id = card.getAttribute("id");
		});

		card.querySelector(".check_btn").addEventListener("click", (_) => {
			card.classList.toggle("checked");
			checkTask(card.getAttribute("id"), card.classList.contains("checked"));
		});
	});
}

function clearTasksForm() {
	task_title.value = "";
	task_date.value = "";
	task_time.value = "";
	task_description.value = "";
	today_btn.classList.contains("active")
		? today_btn.classList.remove("active")
		: null;
	edited_card_id = "";
	document.querySelector(".task_date").classList.contains("inactive")
		? document.querySelector(".task_date").classList.remove("inactive")
		: null;
}

function changeDateFormat(date_string) {
	let date = new Date(date_string),
		options = { year: "numeric", month: "short", day: "numeric" };
	return (formattedDate = date.toLocaleDateString("en-US", options));
}

function changeTimeFormat(time_string) {
	let [hour, minute] = time_string.split(":"),
		period = "AM",
		hour_formatted = parseInt(hour);

	if (hour_formatted >= 12) {
		period = "PM";
		if (hour_formatted > 12) hour_formatted -= 12;
	}

	if (hour_formatted === 0) hour_formatted = 12; // Handle midnight case

	return (formattedTime = `${String(hour_formatted).padStart(
		2,
		"0"
	)}:${minute} ${period}`);
}

function spreadTasksFromLocalStorage(tasks) {
	tasks_list = tasks;
	addTaskToList();
}

function addDataToLoacalStorageFrom(tasksArray) {
	window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function getDataFromLocalStorage() {
	let data = window.localStorage.getItem("tasks");
	if (data) {
		let tasks = JSON.parse(data);
		spreadTasksFromLocalStorage(tasks);
	}
}
