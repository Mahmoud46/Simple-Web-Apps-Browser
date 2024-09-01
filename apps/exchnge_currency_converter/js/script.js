let apiKey = 'a3e86099644ba5c6441d76e4';

let dropList = document.querySelectorAll('.drop-list select'),
    getButton = document.querySelector('form button'),
    fromCurrency = document.querySelector('.from select'),
    toCurrency = document.querySelector('.to select'),
    exchangeIcon = document.querySelector('.icon');

for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_list) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if (i == 1) {
            selected = currency_code == "EGP" ? "selected" : "";
        }
        let optionTag = `<option ${selected} value="${currency_code}">${currency_code}</option>`;
        dropList[i].innerHTML += optionTag;
    }
    dropList[i].addEventListener('change', e => {
        loadFlag(e.target);  // calling loadFlag with passing the target element as an argument
    });

}
let getExchangeRate = _ => {
    let amount = document.querySelector('form .amount input'),
        exchangeRateTxt = document.querySelector('.exchange-rate'),
        amountVal = amount.value;

    if (amountVal == '' || amountVal == "0") {
        amount.value = '1';
        amountVal = 1;
    }
    exchangeRateTxt.innerText = 'Getting exchange rate...';
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url).then(res => res.json()).then(data => {
        let exhangeRate = data.conversion_rates[toCurrency.value],
            totalExchangeRate = (exhangeRate * amountVal).toFixed(2);
        exchangeRateTxt.innerHTML = `<span>${amountVal}</span> ${fromCurrency.value} = <span>${totalExchangeRate}</span> ${toCurrency.value}`;
    }).catch(_ => { exchangeRateTxt.innerText = 'Something went wrong' });
}

function loadFlag(ele) {
    ele.parentElement.querySelector("img").src = `https://flagsapi.com/${country_list[ele.value]}/flat/64.png`;
}


getButton.addEventListener('click', e => {
    e.preventDefault();
    getExchangeRate();
});
window.addEventListener('load', _ => {
    getExchangeRate();
});
exchangeIcon.addEventListener('click', _ => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(toCurrency);
    loadFlag(fromCurrency);
    getExchangeRate();
});
document.querySelectorAll('.select-box').forEach(ele => ele.addEventListener('click', _ => ele.querySelector('select')));