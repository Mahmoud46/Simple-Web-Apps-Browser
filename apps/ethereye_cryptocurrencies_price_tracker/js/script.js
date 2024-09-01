let curr_info = [
    { curr_name: 'Bitcoin', abb_name: 'BTC', img_url: 'https://res.coinpaper.com/coinpaper/bitcoin_btc_logo_62c59b827e.png' },
    { curr_name: 'Ethereum', abb_name: 'ETH', img_url: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    { curr_name: 'Dogecoin', abb_name: 'DOGE', img_url: 'https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png' },
    { curr_name: 'Shiba Inu', abb_name: 'SHIB', img_url: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png' },
    { curr_name: 'Sweat Economy', abb_name: 'SWEAT', img_url: 'https://framerusercontent.com/images/FYhfhb3ysVXGh3ajfmgFYYbpU.webp' },
    { curr_name: 'NEAR Protocol', abb_name: 'NEAR', img_url: 'https://s3.coinmarketcap.com/static-gravity/image/ef3ad80e423a4449ab8e961b0d1edea4.png' },
    { curr_name: 'Polygon', abb_name: 'MATIC', img_url: 'https://pbs.twimg.com/profile_images/1781425963265327104/TB5fMI9O_400x400.jpg' },
    { curr_name: 'Bonk', abb_name: 'BONK', img_url: 'https://cryptologos.cc/logos/bonk1-bonk-logo.png' },
    { curr_name: 'TRON', abb_name: 'TRX', img_url: 'https://cdn-icons-png.flaticon.com/512/12114/12114250.png' },
],
    calc_container = document.querySelector('.cal-container'),
    container = document.querySelector('.container'),
    curr_amount_input = document.getElementById('curr_amount'),
    curr_price_input = document.getElementById('curr_price'),
    curr_card_list = [],
    unit_price = 0;

container.innerHTML = '';
curr_card_list = [];

for (let i = 0; i < curr_info.length; i++) {
    let curr = curr_info[i];
    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${curr.abb_name}`, {
    }).then(res => res.json().then(data => {
        console.log(`${curr.curr_name} - ${curr.abb_name}`);
        console.log(data.data.rates.USDT);

        AddCardToContainer(curr.img_url, curr.curr_name, curr.abb_name, data.data.rates.USDT);
    }))
}

document.querySelector('.cls-btn').addEventListener('click', _ => calc_container.classList.remove('active'));

function AddCardToContainer(img_url, curr_name, abb_name, curr_price) {
    container.innerHTML += `
    <div class="card curr-${abb_name.toLowerCase()}">
        <img class="bg-full" src="${img_url}" alt="">
        <img class="curr_logo" src="${img_url}" alt="">
        <div class="info">
            <p><span class="curr_name">${curr_name}</span> <span class="abb_name">${abb_name}</span></p>
            <p>~$${parseFloat(curr_price) < 0.0001 ? parseFloat(curr_price).toFixed(6) : parseFloat(curr_price).toFixed(4)}</p>
        </div>
        <span class="material-symbols-outlined calc">calculate</span>
    </div>`;
    curr_card_list.push(`curr-${abb_name.toLowerCase()}`);
    ShowCalcWindow(curr_card_list);
}

function ShowCalcWindow(curr_card_list) {
    curr_card_list.forEach(card => {
        let card_cont = document.querySelector(`.${card}`);
        card_cont.querySelector('span.calc').addEventListener('click', _ => {
            let curr_logo = card_cont.querySelector('.curr_logo').src,
                curr_name = card_cont.querySelector('.curr_name').innerText,
                curr_abb = card_cont.querySelector('.abb_name').innerText;

            RetrivePricesForCal(curr_abb);

            curr_price_input.focus();

            document.querySelector('.calc-card .header').innerHTML = `<img src="${curr_logo}" alt="">
            <p><span>${curr_name}</span> <span>${curr_abb}</span></p>`
            document.querySelector('.curr-amount span').innerText = curr_abb;
            calc_container.classList.add('active');
        });
    });
}

function RetrivePricesForCal(curr_abb) {
    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${curr_abb}`, {
    }).then(res => res.json().then(data => {
        unit_price = data.data.rates.USDT;
        curr_amount_input.value = 1;
        curr_price_input.value = data.data.rates.USDT;
    }))
}

curr_amount_input.addEventListener('input', e => {
    curr_price_input.value = (unit_price * e.target.value);
});

curr_price_input.addEventListener('input', e => {
    curr_amount_input.value = (e.target.value / unit_price);
});
