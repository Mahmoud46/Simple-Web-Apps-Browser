let lengthSlider = document.querySelector('.pass-length input'),
    options = document.querySelectorAll('.options .option input'),
    passInput = document.querySelector('.input-box input'),
    passIndicator = document.querySelector('.pass-indicator'),
    copyBtn = document.querySelector('.input-box i'),
    generatePasswordBtn = document.querySelector('button.generate-btn');

let characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=<>/|~;:.,',
}

let generatePassword = _ => {
    let staticPassword = '',
        randomPassword = '',
        excludeDuplicate = false,
        passLength = lengthSlider.value;
    options.forEach(option => {
        if (option.checked) {
            if (option.id !== 'spaces' && option.id !== 'exc-duplicate') {
                staticPassword += characters[option.id];
            } else if (option.id === 'spaces') {
                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });
    for (let i = 0; i < passLength; i++) {
        // get random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {  // if exludeDuplicate is true
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passInput.value = randomPassword;
};
let updatePassIndicator = _ => {
    passIndicator.id = lengthSlider.value <= 8 ? 'weak' : lengthSlider.value <= 16 ? "medium" : "strong";
}
let updateSlider = _ => {
    let min = lengthSlider.min,
        max = lengthSlider.max,
        val = lengthSlider.value;
    lengthSlider.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    document.querySelector('.pass-length .detials span').innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
};
let copyPassword = _ => {
    if (copyBtn.classList.contains('fa-copy')) {
        copyBtn.classList.replace('fa-copy', 'fa-check');
        navigator.clipboard.writeText(passInput.value);
    }
    setTimeout(_ => copyBtn.classList.replace('fa-check', 'fa-copy'), 1500);
}


updateSlider();

lengthSlider.addEventListener('input', updateSlider);
generatePasswordBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);