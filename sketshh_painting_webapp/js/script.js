let canvas = document.querySelector('canvas'),
    toolBtns = document.querySelectorAll('.tool'),
    fillColor = document.getElementById('fill-color'),
    sizeSlider = document.getElementById('size-slider'),
    colorsBtns = document.querySelectorAll('.colors .option'),
    colorPicker = document.getElementById('color-picker'),
    clearCanvas = document.querySelector('.clear-canvas'),
    saveImg = document.querySelector('.save-img'),
    ctx = canvas.getContext('2d');



// global cariables with default values
let prevMouseX,
    prevMouseY,
    snapshot,
    isDrawing = false,
    selectedTool = 'brush',
    brushWidth = 5,
    selectedColor = 'rgb(0,0,0)',
    canvasBackgroundColor = '';

// let shapes = [],
//     temShapes = [],
//     current_Shape_index = null,
//     is_dragging = false,
//     startX,
//     startY;

let setCanvasBackground = _ => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;  // setting fillstyle bthe selectack to 
}
// remove the offset error between cursor location and line location
window.addEventListener('load', _ => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
})
// draw rectangle
let drawRectangle = e => {
    // let permSet = []
    // fillColor isn't checked draw a rectangle border else draw rectangle with background
    if (!fillColor.checked) {
        // creating circle according to the mouse pointer
        ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
        // permSet.push({ x: e.offsetX, y: e.offsetY, w: prevMouseX - e.offsetX, h: prevMouseY - e.offsetY, color: selectedColor });
    }
    else {
        ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
        // permSet.push({ x: e.offsetX, y: e.offsetY, w: prevMouseX - e.offsetX, h: prevMouseY - e.offsetY, color: selectedColor });
    }
    // return permSet;
};
// draw circle
let drawCircle = ele => {
    ctx.beginPath();   // creating a new path to draw circle
    let radius = Math.sqrt(Math.pow((prevMouseX - ele.offsetX), 2) + Math.pow((prevMouseY - ele.offsetY), 2))
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);  // creating circle according to the mouse pointer
    !fillColor.checked ? ctx.stroke() : ctx.fill();  // if fillColor is chicked fill circle else draw border circle
};

// draw triangle
let drawTriangle = ele => {
    ctx.beginPath();   // creating a new path to draw triangle
    ctx.moveTo(prevMouseX, prevMouseY);  // moving triangle to the mouse pointer
    ctx.lineTo(ele.offsetX, ele.offsetY); // creating first line according to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - ele.offsetX, ele.offsetY);  // creating bottom line of triangle
    ctx.closePath();  // closing path of triangle so the third line is drawn automatically
    !fillColor.checked ? ctx.stroke() : ctx.fill();  // if fillColor is chicked fill triangle else draw border triangle
}
let drawLine = ele => {
    ctx.beginPath();   // creating a new path to draw triangle
    ctx.moveTo(prevMouseX, prevMouseY);  // moving triangle to the mouse pointer
    ctx.lineTo(ele.offsetX, ele.offsetY); // creating first line according to the mouse pointer
    // ctx.lineTo(prevMouseX * 2 - ele.offsetX, ele.offsetY);  // creating bottom line of triangle
    // ctx.closePath();  // closing path of triangle so the third line is drawn automatically
    // !fillColor.checked ? ctx.stroke() : ctx.fill();  // if fillColor is chicked fill triangle else draw border triangle
    ctx.stroke();
}
let startDraw = e => {
    isDrawing = true;
    prevMouseX = e.offsetX;    // passing current mouseX position as prevMouseX value
    prevMouseY = e.offsetY;    // passing current mouseY position as prevMouseY value
    ctx.beginPath();    // create a new path to draw
    ctx.lineWidth = brushWidth;  // passing brussize as line width
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    // copying canvas data & passing as snapshot value.. this avoid dragging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

let drawing = e => {
    if (!isDrawing) return;  // if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0);  // adding copied canvas data on htis canvas
    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);   // creating line accorfing to mouse pointer
        ctx.stroke();   // drawing or filing line with color
    }
    else if (selectedTool === 'rectangle') {
        // temShapes.push(drawRectangle(e)[drawRectangle(e).length - 1]);
        drawRectangle(e);
    }
    else if (selectedTool === 'circle') {
        drawCircle(e);
    }
    else if (selectedTool === 'line') {
        drawLine(e);
    }
    else {
        drawTriangle(e);
    }
};
console.log(toolBtns);
toolBtns.forEach(btn => {
    btn.addEventListener('click', _ => {
        // remove active class from the previous option and adding on current clicked option
        document.querySelector('.option.active').classList.remove('active');
        btn.classList.add('active');
        selectedTool = btn.id;
    });
})

sizeSlider.addEventListener('input', handlingBrushWidth);  // passing slider value ize brushS

colorsBtns.forEach(btn => {
    btn.addEventListener('click', _ => {
        document.querySelector('.options .selected').classList.remove('selected');
        btn.classList.add('selected');
        // passing selected btn background color as selectedColor value
        selectedColor = window.getComputedStyle(btn).getPropertyValue('background-color');
    });
});

colorPicker.addEventListener('change', _ => {
    // passing picked color value from color picker to last color btn background
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener('click', _ => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // clearing whole canvas
    setCanvasBackground();
});

saveImg.addEventListener('click', _ => {
    let link = document.createElement('a');    // creating <a> element
    link.download = `${Date.now()}.jpg`;   // passing current data as link download value
    link.href = canvas.toDataURL();  // passing canvasData as link href value
    link.click();   // clicking link to download image
});

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', _ => {
    isDrawing = false;
});


// slidere
function handlingBrushWidth(e) {
    let target = e.target,
        min = target.min,
        max = target.max,
        val = target.value;
    brushWidth = sizeSlider.value
    console.log(val);
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    console.log(target.style.backgroundSize);
}

