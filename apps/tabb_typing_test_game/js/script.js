let typingText = document.querySelector('.typing-text p'),
    inputField = document.querySelector('.input-field'),
    timeTag = document.querySelector('.time span b'),
    mistakeTag = document.querySelector('.mistakes span.mistakes'),
    wpmTag = document.querySelector('.wpm span.wpm'),
    cpmTag = document.querySelector('.cpm span.cpm'),
    tryAgeinBtn = document.querySelector('.content span.tr-ag-btn'),
    tmsUpWindow = document.querySelector('.tms-up-wind'),
    wlDnWnd = document.querySelector('.ex-dn-wnd');

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
timeTag.innerText = timeLeft;

let randomParagraph = _ => {
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // typingText.innerText = paragraphs[randomIndex];
    paragraphs[randomIndex].split('').forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll('span')[0].classList.add('active');
    // focusing input field on keydown or click event
    document.addEventListener('keydown', () => inputField.focus());
    typingText.addEventListener('click', _ => inputField.focus());
}
let initTimer = _ => {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
        tmsUpWindow.classList.add('active');
        console.log('done');
    }
}
let initTyping = _ => {
    let characters = typingText.querySelectorAll("span"),
        typedChar = inputField.value.split('')[charIndex];
    if (charIndex <= characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {   // once time is start, it won't restart again on every key clicked
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains('incorrect'))
                mistakes--;
            characters[charIndex].classList.remove('incorrect', 'correct');
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add('correct');
            } else {
                mistakes++;
                characters[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove('active'));
        characters[charIndex].classList.add('active');

        let wpm = Math.round(((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60);
        // if wpm value is 0, empty, or infinity then setting it's value to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;  // cpm will not count mistakes
        wpmTag.innerText = wpm;
    }
    else {
        inputField.value = '';
        clearInterval(timer);
        wlDnWnd.querySelector('span b').innerText = maxTime - timeLeft;
        wlDnWnd.classList.add('active');
    }
};

let resetGame = _ => {
    randomParagraph();
    inputField.value = '';
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    tmsUpWindow.classList.contains('active') ? tmsUpWindow.classList.remove('active') : '';
    wlDnWnd.classList.contains('active') ? wlDnWnd.classList.remove('active') : '';
}
randomParagraph();
inputField.addEventListener('input', initTyping);
tryAgeinBtn.addEventListener('click', resetGame);
tmsUpWindow.querySelector('.cls-tms-up-wnd').addEventListener('click', resetGame);
wlDnWnd.querySelector('span.try-agn-btn').addEventListener('click', resetGame);