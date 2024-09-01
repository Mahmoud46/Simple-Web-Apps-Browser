let imageWorkspace = document.querySelector('img.img-wrk'),
    imageInput = document.getElementById('main-img'),
    uploadBtn = document.querySelector('button.upload'),
    downloadBtn = document.querySelector('button.download'),
    menuBtn = document.querySelector('button.menu'),
    conrolBtnsList = document.querySelector('.control-buttons'),
    optionsConatiner = document.querySelector('.option-buttons');
console.log("Thank you")
let optionsList = [{
    value: 'rotate',
    body: `
        <button>
            <span class="material-symbols-outlined">
                rotate_left
            </span>
        </button>
        <button>
            <span class="material-symbols-outlined">
                rotate_right
            </span>
        </button>
        `
}, {
    value: 'zoom',
    body: `
        <button>
            <span class="material-symbols-outlined">
                zoom_out_map
            </span>
        </button>
        <button>
            <span class="material-symbols-outlined">
                zoom_in_map
            </span>
        </button>
        `
},
{
    value: 'flip',
    body: `
        <button>
            <span class="material-symbols-outlined">
                swap_horiz
            </span>
        </button>
        <button>
            <span class="material-symbols-outlined">
                swap_vert
            </span>
        </button>
        `
},
{
    value: 'drag_image',
    body: `
        <button>
            <span class="material-symbols-outlined">
                crop
            </span>
        </button>
        <button>
            <span class="material-symbols-outlined">
                crop_free
            </span>
        </button>
        `
},
{
    value: 'lock_cropper',
    body: `
        <button>
            <span class="material-symbols-outlined">
                lock
            </span>
        </button>
        <button>
            <span class="material-symbols-outlined">
                lock_open
            </span>
        </button>
    `
},
{
    value: 'control_cropper',
    body: `
        <button>
            <span class="material-symbols-outlined">
                clear_all
            </span>
        </button>
        <button>
            <span class="material-symbols-outlined">
                motion_sensor_active
            </span>
        </button>
    `
},
{
    value: 'aspect_ratio',
    body: `
        <button class="ar" value="16:9">
            <span class="material-symbols-outlined">
                crop_16_9
            </span>
            <span>16:9</span>
        </button>
        <button class="ar" value="1:1">
            <span class="material-symbols-outlined">
                crop_square
            </span>
            <span>Square</span>
        </button>
        <button class="ar" value="7:5">
            <span class="material-symbols-outlined">
                crop_7_5
            </span>
            <span>7:5</span>
        </button>
        <button class="ar" value="5:4">
            <span class="material-symbols-outlined">
                crop_5_4
            </span>
            <span>5:4</span>
        </button>
        <button class="ar" value="3:4">
            <span class="material-symbols-outlined">
                crop_portrait
            </span>
            <span>portrait</span>
        </button>
        <button class="ar" value="free">
            <span class="material-symbols-outlined">
                crop_free
            </span>
            <span>Free</span>
        </button>
    `,
}], cropper;

uploadBtn.addEventListener('click', _ => imageInput.click());
imageInput.addEventListener('input', _ => {
    document.querySelectorAll('button.inactive')?.forEach(e => e.classList.remove('inactive'))
    document.querySelectorAll('span.kk').forEach(e => e.style = 'display:none');
    document.querySelector('.image-container').style.background = "#000";
    let file = imageInput.files[0];
    let url = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg' }));
    imageWorkspace.src = url;
    console.log(imageInput.value)

    let options = {
        dragMode: 'move',
        preview: ".img-preview",
        viewMode: 2,
        modal: true,
        background: false,
        ready: function () {
            conrolBtnsList.querySelectorAll('button').forEach(ele => {
                ele.addEventListener('click', _ => {
                    console.log(ele.classList[0]);
                    conrolBtnsList.querySelector('button.active')?.classList.remove('active');
                    ele.classList.add('active');
                    optionsConatiner.classList.remove(`${optionsConatiner.classList[1]}`);
                    optionsList.forEach(e => {
                        if (e.value == ele.classList[0]) {
                            optionsConatiner.innerHTML = e.body;
                            optionsConatiner.classList.add(`${e.value}`);
                            console.log(optionsConatiner.classList);
                            // rotate image
                            if (optionsConatiner.classList.contains('rotate')) {
                                optionsConatiner.querySelectorAll('button')[0].addEventListener('click', _ => cropper.rotate(-45));
                                optionsConatiner.querySelectorAll('button')[1].addEventListener('click', _ => cropper.rotate(45));
                            }
                            else if (optionsConatiner.classList.contains('zoom')) {
                                // zoom for image
                                optionsConatiner.querySelectorAll('button')[0].addEventListener('click', _ => cropper.zoom(-0.1));
                                optionsConatiner.querySelectorAll('button')[1].addEventListener('click', _ => cropper.zoom(0.1));
                            }
                            else if (optionsConatiner.classList.contains('aspect_ratio')) {
                                // set aspect ratio
                                optionsConatiner.querySelectorAll('button')[0].addEventListener('click', _ => cropper.setAspectRatio(16 / 9));
                                optionsConatiner.querySelectorAll('button')[1].addEventListener('click', _ => cropper.setAspectRatio(1 / 1));
                                optionsConatiner.querySelectorAll('button')[2].addEventListener('click', _ => cropper.setAspectRatio(7 / 3));
                                optionsConatiner.querySelectorAll('button')[3].addEventListener('click', _ => cropper.setAspectRatio(5 / 4));
                                optionsConatiner.querySelectorAll('button')[4].addEventListener('click', _ => cropper.setAspectRatio(3 / 4));
                                optionsConatiner.querySelectorAll('button')[5].addEventListener('click', _ => cropper.setAspectRatio(0));   // free
                            }
                            else if (optionsConatiner.classList.contains('flip')) {
                                // flip image
                                let flipX = -1,
                                    flipY = -1;
                                optionsConatiner.querySelectorAll('button')[0].addEventListener('click', _ => {
                                    cropper.scale(flipX, 1);
                                    flipX = -flipX;
                                });
                                optionsConatiner.querySelectorAll('button')[1].addEventListener('click', _ => {
                                    cropper.scale(1, flipY);
                                    flipY = -flipY;
                                });
                            }
                            else if (optionsConatiner.classList.contains('drag_image')) {
                                // drag mode
                                optionsConatiner.querySelectorAll('button')[0].addEventListener('click', _ => cropper.setDragMode("crop"));
                                optionsConatiner.querySelectorAll('button')[1].addEventListener('click', _ => cropper.setDragMode("move"));
                            }
                            else if (optionsConatiner.classList.contains('lock_cropper')) {
                                // lock cropper
                                optionsConatiner.querySelectorAll('button')[0].addEventListener('click', _ => cropper.disable());
                                optionsConatiner.querySelectorAll('button')[1].addEventListener('click', _ => cropper.enable());
                            }
                            else if (optionsConatiner.classList.contains('control_cropper')) {
                                // lock cropper // cropper control
                                optionsConatiner.querySelectorAll('button')[0].addEventListener('click', _ => cropper.clear());
                                optionsConatiner.querySelectorAll('button')[1].addEventListener('click', _ => cropper.crop());
                            }
                        }
                    });
                });
            });

        }
    }
    cropper = new Cropper(imageWorkspace, options);
    cropper.replace(url);
    let cropeprContainers = document.querySelectorAll('.cropper-container');
    cropeprContainers.forEach(e => e.style.display = "none");
    menuBtn.classList.contains('active') ? menuBtn.click() : null;
    optionsConatiner.innerHTML = '';
    conrolBtnsList.querySelector('button.active')?.classList.remove('active');
});

// download cropped image
downloadBtn.addEventListener('click', _ => {
    downloadBtn.innerHTML = `<span class="material-symbols-outlined">
    downloading
    </span>`;
    cropper.getCroppedCanvas().toBlob(blob => {
        let downloadUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${new Date().getTime()}_cropped_image.jpg`;
        a.click();
        downloadBtn.innerHTML = `<span class="material-symbols-outlined">
        download_done
        </span>`;
        setTimeout(_ => downloadBtn.innerHTML = `<span class="material-symbols-outlined">
        download
        </span>`, 1000);
    });
});

menuBtn.addEventListener('click', _ => {
    menuBtn.classList.toggle('active');
    conrolBtnsList.classList.toggle('active');
    if (menuBtn.classList.contains('active')) {
        menuBtn.innerHTML = `<span class="material-symbols-outlined">
        menu_open
        </span>`;
    } else {
        menuBtn.innerHTML = `<span class="material-symbols-outlined">
        menu
        </span>`;
    }
});

