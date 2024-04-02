let wordText = document.querySelector('.word'),
    hintText = document.querySelector('.hint span.hnt'),
    inputField = document.querySelector('input'),
    timeText = document.querySelector('.time span b'),
    refreshBtn = document.querySelector('.refresh-word'),
    checkBtn = document.querySelector('.check-word');

let correctWord, timer;
let initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(_ => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        document.querySelector('.alert.time-up').classList.add('active');
        document.querySelector('.alert.time-up p span').innerText = correctWord.toUpperCase();
    }, 1000);
};
let initGame = _ => {
    inputField.focus();
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)],
        wordArray = randomObj.word.split('');
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // getting a random number

        // shuffling and swipping wordArray letters randomly
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join('');
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLocaleLowerCase();
    console.log(wordArray, randomObj.word)
    inputField.value = '';   //clear input field
    inputField.setAttribute('maxlength', correctWord.length);
};
let checkWord = _ => {
    let userWord = inputField.value.toLocaleLowerCase();
    if (!userWord) {
        document.querySelector('.alert.empty-field').classList.add('active');
    }
    else if (userWord !== correctWord) {
        document.querySelector('.alert.incorrect').classList.add('active');
        document.querySelector('.alert.incorrect p span').innerText = userWord;
    } else {
        document.querySelector('.alert.correct').classList.add('active');
        document.querySelector('.alert.correct p span').innerText = userWord.toUpperCase();
    }
}
initGame();
refreshBtn.addEventListener('click', initGame);
checkBtn.addEventListener('click', checkWord);
document.querySelector('.em-fl-cls').addEventListener('click', _ => {
    document.querySelector('.alert.empty-field.active').classList.remove('active');
});

document.querySelectorAll('.try-agian').forEach(ele => {
    ele.addEventListener('click', _ => {
        document.querySelector('.alert.active').classList.remove('active');
        initGame();
    });
});