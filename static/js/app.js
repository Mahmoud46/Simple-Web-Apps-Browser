export class App {
	constructor(title, icon, bg, link, size) {
		this.title = title;
		this.icon = icon;
		this.bg = bg;
		this.link = link;
		this.size = size || "";
	}

	render() {
		return `
            <div class="app ${this.size}">
                <div class="app_head">
                    <img src="${this.icon}" alt="" />
                    <span>${this.title}</span>
                </div>
                <img class="bg" src="${this.bg}" alt="" />
                <button class="demo_rev"><a href="${this.link}" target="_blank">Try now</a></button>
            </div>
        `;
	}
}

export class AppManager {
	constructor() {
		this.apps = [];
	}

	addApp(app) {
		this.apps.push(app);
	}

	renderApps() {
		return this.apps.map((app) => app.render()).join("");
	}
}
