let buttons = document.querySelectorAll('.buttons button'),
    outValu = document.querySelector('.val'),
    clearBtn = document.querySelector('.clear');
let calValue = '', stat = true;

buttons.forEach(e => {
    e.addEventListener('click', _ => {
        if (e.getAttribute('value') == 'C') {
            calValue = '';
            outValu.innerHTML = "<span>0</span>"
            stat = true;
        }
        else if (e.getAttribute('value') == '=') {
            try {
                calValue = `${eval(calValue).toFixed(2)}`;
            } catch (e) {
                alert('Invalid Value!');
                clearBtn.click();
                return;
            }
            outValu.innerHTML = `<span>${eval(calValue).toFixed(2)}</span>`;
        }
        else {
            if (stat) {
                calValue = '';
                outValu.innerHTML = ""
                stat = false;
            }
            calValue += e.getAttribute('value');
            outValu.innerHTML += `<span>${e.getAttribute('display')}</span>`;
        }
    })
});
