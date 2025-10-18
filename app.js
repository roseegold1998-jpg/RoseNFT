const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');

// API from exchangerate.host (free, no key needed)
const apiURL = "https://api.exchangerate.host/latest";

async function loadCurrencies() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
    } catch (error) {
        resultDiv.textContent = "Error loading currency list.";
    }
}

async function convertCurrency() {
    const amount = amountInput.value;
    if (amount === "" || amount <= 0) {
        resultDiv.textContent = "Please enter a valid amount.";
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {
        const response = await fetch(`${apiURL}?base=${from}&symbols=${to}`);
        const data = await response.json();
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);

        resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
    } catch (error) {
        resultDiv.textContent = "Conversion failed. Please try again.";
    }
}

convertBtn.addEventListener('click', convertCurrency);

document.addEventListener('DOMContentLoaded', loadCurrencies);
