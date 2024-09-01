let box = document.querySelector('.box');

document.addEventListener('keydown', e => {
    let keyName = e.keyCode === 32 ? "Space" : e.key;
    document.querySelector('.key-code').innerText = e.keyCode;
    document.querySelector('.code span').innerText = e.keyCode;
    document.querySelector('.key-name').innerText = keyName;
    document.querySelector('.key span').innerText = keyName;
    document.querySelector('h1 img').src = './imgs/main-logo.svg';
    document.querySelector('h1 img').style = 'width:100px';
    box.classList.add('active');
});