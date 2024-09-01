let container = document.querySelector('.container'),
    mainVideo = document.querySelector('video'),
    videoTimeLine = document.querySelector('.video-timeline'),
    volumeBtn = document.querySelector('button.volume span'),
    volumeInput = document.querySelector('.options.left input'),
    progressBar = document.querySelector('.progress-bar'),
    skipBackward = document.querySelector('.skip-backward span'),
    playPauseBtn = document.querySelector('.play-pause span'),
    skipForward = document.querySelector('.skip-forward span'),
    speedBtn = document.querySelector('.playback-content button span'),
    speedOptions = document.querySelector('.playback-content .speed-options'),
    speedOptionsList = document.querySelectorAll('.playback-content .speed-options li'),
    picInPicBtn = document.querySelector('.pic-in-pic span'),
    fullSecreenBtn = document.querySelector('.fullscreen span'),
    currentVideoTime = document.querySelector('.current-time'),
    videoDuration = document.querySelector('.video-duration'),
    uploadBtn = document.querySelector('.upload-vid span'),
    videoFileInput = document.getElementById('movie-file-input'),
    layout = document.querySelector('.layout');

let timer;

function setVideo(src) {
    mainVideo.src = src;
    container.classList.add('show-controls')
    mainVideo.addEventListener('loadedmetadata', _ => {
        videoDuration.innerText = formatTime(mainVideo.duration);
        progressBar.style.width = `0%`
        playPauseBtn.innerText = 'play_arrow';
        layout.classList.remove('active');
        console.log("Hi");
        mainVideo.pause();
    });
}

function hideControls() {
    if (mainVideo.paused) return;
    timer = setTimeout(_ => container.classList.remove('show-controls'), 3000)
}

hideControls();

container.addEventListener('mousemove', _ => {
    container.classList.add('show-controls');
    clearTimeout(timer);
    hideControls();
});

function formatTime(time) {
    let seconds = Math.floor(time % 60),
        minutes = Math.floor(time / 60) % 60,
        hours = Math.floor(time / 3600);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    if (hours == 0) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
};

setTimeout(_ => {
    videoDuration.innerText = formatTime(mainVideo.duration);
    console.log('ready');
}, 300);

function draggableProgressBar(e) {
    let timeLineWidth = videoTimeLine.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timeLineWidth) * mainVideo.duration;
    currentVideoTime.innerText = formatTime(mainVideo.currentTime);
};

videoTimeLine.addEventListener('mousedown', _ => {
    videoTimeLine.addEventListener('mousemove', draggableProgressBar);
});

container.addEventListener('mouseup', _ => {
    videoTimeLine.removeEventListener('mousemove', draggableProgressBar);
});

videoTimeLine.addEventListener('click', e => {
    let timeLineWidth = videoTimeLine.clientWidth;
    mainVideo.currentTime = (e.offsetX / timeLineWidth) * mainVideo.duration;
});

fullSecreenBtn.addEventListener('click', _ => {
    container.classList.toggle('fullscreen');
    if (document.fullscreenElement) {
        console.log("Not");
        picInPicBtn.parentElement.style.display = 'flex';
        uploadBtn.parentElement.style.display = 'flex';
        document.querySelector('.video-controls').style = "margin-bottom: 7px;"
        // fullSecreenBtn.classList.replace('fa-compress', 'fa-expand');
        fullSecreenBtn.innerText = 'fullscreen';
        document.querySelector('.wrapper').classList.remove('at-full');

        return document.exitFullscreen();
    }
    console.log("Full");
    document.querySelector('.wrapper').classList.add('at-full');
    document.querySelector('.video-controls').style = "margin-bottom: 0px;"
    picInPicBtn.parentElement.style.display = 'none';
    uploadBtn.parentElement.style.display = 'none';
    // fullSecreenBtn.classList.replace('fa-expand', 'fa-compress');
    fullSecreenBtn.innerText = 'fullscreen_exit';
    container.requestFullscreen();
});

speedOptionsList.forEach(option => {
    option.addEventListener('click', _ => {
        speedOptions.querySelector('.active').classList.remove('active');
        option.classList.add('active');
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.classList.remove('active');
    });
})

picInPicBtn.addEventListener('click', _ => {
    mainVideo.requestPictureInPicture(); // change video mode to picture in picture
})

speedBtn.addEventListener('click', _ => {
    speedOptions.classList.toggle('active');
});

document.addEventListener('click', e => {
    if (e.target.tagName !== 'SPAN' || e.target.className !== 'material-symbols-outlined') {
        speedOptions.classList.remove('active');
    }
});
mainVideo.addEventListener('timeupdate', e => {
    let { currentTime, duration } = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVideoTime.innerText = formatTime(currentTime);
    if (progressBar.style.width == '100%') playPauseBtn.click();
});
volumeBtn.addEventListener('click', _ => {
    if (!(volumeBtn.innerText == "volume_up")) {
        mainVideo.volume = 0.5; // passing 0.5 value as video vilume
        // volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high');
        volumeBtn.innerText = "volume_up"
    }
    else {
        mainVideo.volume = 0.0;
        // volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
        volumeBtn.innerText = "volume_off"

    }
    volumeInput.value = mainVideo.volume * 100;
});
volumeInput.addEventListener('input', _ => {
    mainVideo.volume = (volumeInput.value / 100);
    if ((volumeInput.value / 100) === 0) {
        // volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
        volumeBtn.innerText = "volume_off"
    }
    else {
        // volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high');
        volumeBtn.innerText = "volume_up"
    }
});
skipBackward.addEventListener('click', _ => mainVideo.currentTime -= 5);
skipForward.addEventListener('click', _ => mainVideo.currentTime += 10);

playPauseBtn.addEventListener('click', _ => {
    if (mainVideo.paused) {
        mainVideo.play();
        playPauseBtn.innerText = 'pause';
    }
    else {
        mainVideo.pause();
        playPauseBtn.innerText = 'play_arrow';
    }
});

videoTimeLine.addEventListener('mousemove', e => {
    let progressTime = videoTimeLine.querySelector('span');
    progressTime.style.left = `${e.offsetX}px`;
    let time = (e.offsetX / videoTimeLine.clientWidth) * mainVideo.duration;
    progressTime.innerText = formatTime(time);
});


document.addEventListener('keyup', e => {
    console.log(e.key)
    if (e.key == " ") {
        playPauseBtn.click();
        container.classList.add('show-controls');
        hideControls();
    } else if (e.key == 'ArrowRight') skipForward.click();
    else if (e.key == 'ArrowLeft') skipBackward.click();
});

uploadBtn.addEventListener('click', _ => videoFileInput.click());

videoFileInput.addEventListener('input', _ => {
    let file = videoFileInput.files[0];
    if (file && (file.type == 'video/webm' || file.type == 'video/mp4')) {
        layout.classList.add('active');
        let reader = new FileReader();
        reader.onload = _ => {
            let url = reader.result;
            setVideo(url);
            videoFileInput.value = '';
        }
        reader.readAsDataURL(file);
    }
});

