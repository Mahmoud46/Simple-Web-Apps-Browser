let quoteTxt = document.querySelector('.quote'),
    authorName = document.querySelector('.author .name'),
    quoteBtn = document.querySelector('button'),
    soundBtn = document.querySelector('.sound'),
    copyBtn = document.querySelector('.copy'),
    catSelect = document.querySelector('.features li select'),
    layHndlr = document.querySelector('.layout');

// random quote function
let randomQuote = _ => {
    quoteBtn.classList.add('loading');
    quoteBtn.classList.add('handle');
    layHndlr.classList.add('active');
    quoteBtn.innerText = "Loading Quote...";
    getQuote(catSelect.value);
}
soundBtn.addEventListener('click', _ => {
    //the SpeechSynthesisUtterance is a web speech api that represents a speech request 
    let utterance = new SpeechSynthesisUtterance(`${quoteTxt.innerText} by ${authorName.innerText}`);
    speechSynthesis.speak(utterance);
});
copyBtn.addEventListener('click', _ => {
    navigator.clipboard.writeText(quoteTxt.innerText);
});

quoteBtn.addEventListener('click', randomQuote);
catSelect.addEventListener('change', randomQuote);
randomQuote();

function getQuote(cat) {
    fetch(`https://api.api-ninjas.com/v1/quotes?category=age`, {
        method: "GET",
        headers: new Headers({
            'X-Api-Key': 'b2daBUYy20yM3dabdQBV/g==M0QWieTp1kpPiC1k',
            'content-type': "application/json",
        }),
    }).then(response => {
        response.json().then(data => {
            quoteTxt.innerText = data[0].quote;
            authorName.innerText = data[0].author;
            quoteBtn.innerText = "New Quote";
            quoteBtn.classList.remove('loading');
            quoteBtn.classList.remove('handle');
            layHndlr.classList.remove('active');
        });
    });
}
