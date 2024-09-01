let fileInput = document.querySelector('.file-input'),
    filterOptions = document.querySelectorAll('.filter button'),
    rotateOptions = document.querySelectorAll('.rotate button'),
    filterName = document.querySelector('.filter-info .name'),
    flterValue = document.querySelector('.filter-info .value'),
    filterSlider = document.querySelector('.slider input'),
    previewImg = document.querySelector('.preview-img img'),
    resetFilterBtn = document.querySelector('.reset-filter'),
    chooseImgBtn = document.querySelector('.choose-img'),
    saveImgBtn = document.querySelector('.save-img');

let brightness = 100,
    saturation = 100,
    inversion = 0,
    grayscale = 0,
    rotation = 0,
    flipHorizontal = 1,
    flipVertical = 1;

let applyFilters = _ => {
    previewImg.style.transform = `rotate(${rotation}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
let loadImage = _ => {
    let file = fileInput.files[0];  // getting user selected file
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);  // passing file url as preview img src
    previewImg.addEventListener('load', _ => {
        resetFilterBtn.click();
        document.querySelector('.container').classList.remove('disable');
    });
}
let updateFilter = _ => {
    flterValue.innerText = `${filterSlider.value}%`;
    let selectedFilter = document.querySelector('.filter .active');
    if (selectedFilter.id === 'brightness') {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === 'saturation') {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === 'inversion') {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilters();
};

let resetFilter = _ => {
    brightness = 100;
    saturation = 100;
    inversion = 0;
    grayscale = 0;
    rotation = 0;
    flipHorizontal = 1;
    flipVertical = 1;
    filterOptions[0].click();
    applyFilters();
};

let saveImage = _ => {
    let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    // applying user selected filters to canvas filter
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);  // translating canvas from center
    if (rotation !== 0) { // if rotation isn't 0, rotate canvas
        ctx.rotate(rotation * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);  // flip canvas horizontally / vertically
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);


    let link = document.createElement('a');  // creating <a> element
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    link.click();
}

filterOptions.forEach(option => {
    option.addEventListener('click', _ => {
        document.querySelector('.filter button.active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.id;
        if (option.id === 'brightness') {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            flterValue.innerText = `${filterSlider.value}%`
        } else if (option.id === 'saturation') {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            flterValue.innerText = `${filterSlider.value}%`
        } else if (option.id === 'inversion') {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            flterValue.innerText = `${filterSlider.value}%`
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            flterValue.innerText = `${filterSlider.value}%`
        }
    })
});

rotateOptions.forEach(option => {
    option.addEventListener('click', _ => {
        if (option.id === 'vertical') {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        else {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        applyFilters();
    })
});

saveImgBtn.addEventListener('click', saveImage);
resetFilterBtn.addEventListener('click', resetFilter);
filterSlider.addEventListener('input', updateFilter);
fileInput.addEventListener('change', loadImage);
chooseImgBtn.addEventListener('click', _ => fileInput.click());