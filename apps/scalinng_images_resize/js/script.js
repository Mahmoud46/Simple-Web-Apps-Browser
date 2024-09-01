let uploadBox = document.querySelector('.upload-box'),
    wrapper = document.querySelector('.wrapper'),
    previewImg = uploadBox.querySelector('img.prev-img'),
    fileInput = uploadBox.querySelector('input'),
    widthInput = document.querySelector('.width input'),
    heightInput = document.querySelector('.height input'),
    ratioCheckbox = document.querySelector('.ratio input'),
    qualityCheckbox = document.querySelector('.quality input'),
    downloadBtn = document.querySelector('.download-btn');

let ogImageRatio;
let loadFile = e => {
    let file = e.target.files[0];    // getting first user selected file
    if (!file) return;   // return if the user hasn't selected any file
    previewImg.src = URL.createObjectURL(file); // passing selected file url to preview img src
    previewImg.addEventListener('load', _ => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        wrapper.classList.add('active');
        uploadBox.classList.add('active');
        previewImg.classList.add('active');
        document.querySelector('img.hld-img').classList.remove('active');
    });
};

widthInput.addEventListener('keyup', _ => {
    let height = ratioCheckbox.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener('keyup', _ => {
    let width = ratioCheckbox.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

let resizeAndDownload = _ => {
    let canvas = document.createElement('canvas'),
        link = document.createElement('a'),
        ctx = canvas.getContext('2d'),
        imgQuality = qualityCheckbox.checked ? 0.7 : 1.0;

    // setting canvaas height & width according to input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    //drawing user selected image onto the canvas
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

    link.href = canvas.toDataURL("image/jpeg", imgQuality);
    link.download = new Date().getTime();
    link.click();
}

downloadBtn.addEventListener('click', resizeAndDownload)
fileInput.addEventListener('change', loadFile);
uploadBox.addEventListener('click', _ => fileInput.click());