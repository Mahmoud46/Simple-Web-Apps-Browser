let screenshotBtn = document.getElementById('src-btn'),
    screenshotPreview = document.querySelector('.src-preview'),
    closeBtn = document.getElementById('close-btn'),
    downloadBtn = document.getElementById('download-btn');



let captureScreen = async () => {
    try {
        // asking permossion to use a media input to record current tab
        let stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true }),
            video = document.createElement('video');

        video.addEventListener('loadedmetadata', _ => {
            let canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');

            // passing video width & height as canvas width & height
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            video.play();  // playing the video so the draw image won't be black or blank
            // drawing an image from the captured video stream
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            stream.getVideoTracks()[0].stop();  // terminating the first video track of the stream
            screenshotPreview.querySelector('img').src = canvas.toDataURL();
            screenshotPreview.classList.add('active');
        });
        video.srcObject = stream;  // passing captur stream data as video source object
    }
    catch (error) {
        alert('Failed to capture screenshot!');
    }
}

let downloadImg = _ => {
    let a = document.createElement('a');
    a.href = screenshotPreview.querySelector('img').src;
    a.download = `${new Date().getTime()}_snapped_image.jpg`;
    a.click();
}
screenshotBtn.addEventListener('click', captureScreen);
closeBtn.addEventListener('click', _ => screenshotPreview.classList.remove('active'));
downloadBtn.addEventListener('click', downloadImg);