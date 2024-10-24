import { App, AppManager } from "./app.js";

let appManager = new AppManager();

// Fetch data from json
fetch("./static/data/apps.json")
	.then((response) => response.json())
	.then((data) => {
		// For each app in the data, create a new App instance and add it to AppManager
		data.forEach((app_data) => {
			const app = new App(
				app_data.title,
				app_data.icon,
				app_data.bg,
				app_data.link,
				app_data.size
			);
			appManager.addApp(app);
		});

		// Render the apps in the apps container
		document.querySelector("section").innerHTML = appManager.renderApps();
	})
	.catch((error) => {
		console.error("Error loading app data:", error);
	});
