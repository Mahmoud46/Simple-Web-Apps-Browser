let selectTag = document.querySelectorAll('select'),
    fromText = document.querySelector('.from-text'),
    toText = document.querySelector('.to-text'),
    exchangeBtn = document.querySelector('.exchange'),
    translateBtn = document.querySelector('button'),
    icons = document.querySelectorAll('.row .icons span');

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        // selecting English by default as FROM language and Arabic as TO language
        let selected;
        if (id == 0 && country_code == 'en-GB') {
            selected = 'selected';
        }
        else if (id == 1 && country_code == 'ar-SA') {
            selected = 'selected';
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option);
    }
});

icons.forEach(icon => {
    icon.addEventListener('click', e => {
        if (e.target.classList.contains('fa-copy')) {
            if (e.target.id == 'from') {
                navigator.clipboard.writeText(fromText.value);
            }
            else {
                navigator.clipboard.writeText(toText.value);
            }
        }
        else {
            let utterance;
            if (e.target.id == 'from') {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
})

exchangeBtn.addEventListener('click', _ => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;

    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
})
translateBtn.addEventListener('click', _ => {
    let text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
    });
})