import songs from "./songs.js";

let music = document.getElementById("audio");

let playPauseBtn = document.querySelector(".play-pause-btn span"),
	songDisk = document.querySelector(".disk"),
	songDuration = document.querySelector(".song-duration"),
	currentTime = document.querySelector(".current-time"),
	musicName = document.querySelector(".music-name"),
	musicArtist = document.querySelector(".artist-name"),
	seekBar = document.querySelector(".seek-bar"),
	forwardBtn = document.querySelector(".forward-btn"),
	backwardBtn = document.querySelector(".backward-btn"),
	repeatBtn = document.querySelector(".btn.repeat"),
	shuffleBtn = document.querySelector(".btn.shuffle"),
	volumeBtn = document.querySelector(".btn.volume"),
	volumeSeek = document.getElementById("volume-seak");

let currentMusic = 0,
	isShuffle = false,
	isRepeat = false;

playPauseBtn.addEventListener("click", (_) => {
	if (playPauseBtn.innerText == "play_arrow") {
		playPauseBtn.innerText = "pause";
		songDisk.classList.add("paly");
		audio.play();
	} else {
		playPauseBtn.innerText = "play_arrow";
		audio.pause();
		songDisk.classList.remove("paly");
	}
});

seekBar.addEventListener("input", (_) => {
	music.currentTime = seekBar.value;
	currentTime.innerText = foramtTime(music.currentTime);
});

music.addEventListener("ended", (_) => {
	playPauseBtn.click();
	if (isShuffle) {
		currentMusic++;
		currentMusic = currentMusic == songs.length ? 0 : currentMusic;
		setMusic(currentMusic);
		playPauseBtn.click();
	} else if (isRepeat) {
		setMusic(currentMusic);
		playPauseBtn.click();
	}
});

forwardBtn.addEventListener("click", (_) => {
	currentMusic++;
	if (currentMusic == songs.length) currentMusic = 0;
	songDisk.classList.remove("play");
	songDisk.classList.add("play");
	setMusic(currentMusic);
	playPauseBtn.click();
});

backwardBtn.addEventListener("click", (_) => {
	currentMusic--;
	if (currentMusic == -1) currentMusic = songs.length - 1;
	setMusic(currentMusic);
	playPauseBtn.click();
});

shuffleBtn.addEventListener("click", (_) => {
	shuffleBtn.classList.toggle("active");
	isShuffle = isShuffle ? false : true;
});

repeatBtn.addEventListener("click", (_) => {
	repeatBtn.classList.toggle("active");
	isRepeat = isRepeat ? false : true;
});

volumeBtn.addEventListener("click", (_) => {
	volumeBtn.classList.toggle("active");
	document.querySelector(".volume-range").classList.toggle("active");
});

volumeSeek.addEventListener("input", (_) => {
	music.volume = volumeSeek.value / 100;
	volumeBtn.querySelector("span").innerHTML =
		music.volume == 0 ? "volume_off" : "volume_up";
});

setInterval((_) => {
	seekBar.value = music.currentTime;
	currentTime.innerText = foramtTime(music.currentTime);
}, 500);

setMusic(currentMusic);

function setMusic(i) {
	let song = songs[i];
	seekBar.value = 0;
	currentMusic = i;
	music.src = song.path;
	song.name.length >= 12
		? musicName.classList.add("small")
		: musicName.classList.contains("small")
		? musicName.classList.remove("small")
		: null;
	musicName.innerText = song.name;
	musicArtist.innerText = song.artist;
	songDisk.style.backgroundImage = `url('${song.cover}')`;
	document.body.style.backgroundImage = `linear-gradient(rgba(155, 155, 155, 0.6), rgba(117, 117, 117, 0.9)), url('${song.cover}')`;

	music.addEventListener("loadedmetadata", () => {
		songDuration.innerText = formatTime(music.duration);
		seekBar.max = music.duration;
	});
}
function formatTime(time) {
	let min = Math.floor(time / 60),
		sec = Math.floor(time % 60);
	min = min < 10 ? `0${min}` : min;
	sec = sec < 10 ? `0${sec}` : sec;
	return `${min}:${sec}`;
}

document.addEventListener("keyup", (e) => {
	e.key == " " ? playPauseBtn.click() : null;
});
