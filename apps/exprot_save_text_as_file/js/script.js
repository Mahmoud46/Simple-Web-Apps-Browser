let textarea = document.querySelector('textarea'),
    fileNameInput = document.querySelector('.file-name input'),
    selectMenu = document.querySelector('.save-as select'),
    saveBtn = document.querySelector('.save-btn');


selectMenu.addEventListener('change', _ => {
    let selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
    saveBtn.innerText = `Save As ${selectedOption.split(' ')[0]} File`;
});

saveBtn.addEventListener('click', _ => {
    let blob = new Blob([textarea.value], { type: selectMenu.value }),
        fileUrl = URL.createObjectURL(blob),
        link = document.createElement('a');
    link.download = fileNameInput.value;
    link.href = fileUrl;
    link.click();
});

// starting 
textarea.focus();
textarea.value = "Welcome to Exprot";
fileNameInput.value = "welcome";