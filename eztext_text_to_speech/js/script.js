let textarea = document.querySelector('textarea'),
    speechBtn = document.querySelector('button'),
    voiceList = document.querySelector('select');
let synth = speechSynthesis,
    isSpeaking = true;


let voices = _ => {
    for (let i = 0; i < synth.getVoices().length; i++) {
        let selected = synth.getVoices()[i].name === 'Google US English' ? "selected" : "";
        let option = `<option ${selected} value='${synth.getVoices()[i].name}'>${synth.getVoices()[i].name} (${synth.getVoices()[i].lang})</option>`
        voiceList.innerHTML += option;
    }
};
voices();

synth.addEventListener('voiceschanged', voices);

let textToSpeech = text => {
    let utternance = new SpeechSynthesisUtterance(text);
    for (let i = 0; i < synth.getVoices().length; i++) {
        if (synth.getVoices()[i].name === voiceList.value) {
            utternance.voice = synth.getVoices()[i];
        }
    }
    synth.speak(utternance);
}

speechBtn.addEventListener('click', e => {
    e.preventDefault();
    if (textarea.validity.valid) {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {

            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = 'Pause Speech';
            }
            else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = 'Resume Speech';
            }

            setInterval(_ => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = 'Convert To Speech';
                }
            });
        } else {
            speechBtn.innerText = "Convert To Speech";
        }
    }
});