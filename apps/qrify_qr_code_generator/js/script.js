let wrapper = document.querySelector('.wrapper'),
    generateBtn = document.querySelector('.form button'),
    qrInput = document.querySelector('.form input'),
    qrImg = document.querySelector('.qr-code img');
generateBtn.addEventListener('click', _ => {
    let qrValue = qrInput.value;
    if (!qrValue) return;  // if the input is empty then return from here

    generateBtn.innerHTML = 'Generating QR Code...';

    // api and passing the api returned img src to qrImg
    qrImg.src = `https://quickchart.io/qr?text=${qrValue}&margin=1&size=200&light=fcfcfc00&dark=3e5269`;
    qrImg.addEventListener('load', _ => { // once QR code img loaded
        wrapper.classList.add('active');
        generateBtn.innerHTML = 'Generate QR code';
    });
});
qrInput.addEventListener('keyup', _ => {
    if (!qrInput.value)
        wrapper.classList.remove('active');
});

document.addEventListener('keyup', e => {
    e.key == 'Enter' ? generateBtn.click() : '';
});


function downloadQr() {
    let fileUrl = `https://quickchart.io/qr?text=${qrInput.value}&margin=1&size=200&light=fff&dark=000`,
        anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.target = "_blank";
    anchor.click();
}

document.querySelector('.downloadQRBtn').addEventListener('click', downloadQr)