const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++){
    for (currency_code in country_list) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "UZS" ? "selected" : "";
        }
        let option_tag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", option_tag)
    }
    dropList[i].addEventListener("change", e => {
        loadFlags(e.target)
    })
}
function loadFlags(el) {
    for (code in country_list) {
        if (code == el.value) {
            let img = el.parentElement.querySelector("img");
            img.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`
        }
    }
    getExchangeRate()
}

const icon = document.querySelector(".drop-list .icon");
icon.addEventListener("click", () => {
    let blankVar = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = blankVar;
    getExchangeRate()
    loadFlags(fromCurrency)
    loadFlags(toCurrency)
})

getButton.addEventListener("click", () => {
    getExchangeRate();
})
window.addEventListener("load", e => {
    e.preventDefault();
    getExchangeRate();
})

function getExchangeRate() {
    const amount = document.querySelector(".amount input")
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    const apikey = "640137fca043207e86f4d614"
    let url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurrency.value}`;

    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed();
        document.querySelector(".exchange-rate").innerHTML = "Tekshirilmoqda..."
        setTimeout(() => {
            document.querySelector(".exchange-rate").innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
        }, 2500);
        console.log(totalExchangeRate);
    }).catch(() => {
        document.querySelector(".exchange-rate").innerHTML = "Kechirasiz, megabaytingiz tugagan shekilli!"
    })

}