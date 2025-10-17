// List of available currencies
const currencies = [
    'USD', 'EUR', 'INR', 'GBP', 'AUD', 'CAD', 'JPY', 'CNY', 'BRL', 'MXN', 
    'ZAR', 'RUB', 'HKD', 'SGD', 'CHF', 'NZD', 'KRW', 'TRY', 'MYR', 'THB', 
    'SEK', 'NOK', 'DKK', 'SAR', 'AED', 'KWD', 'EGP', 'PKR', 'IDR', 'VND', 
    'PHP', 'CLP', 'COP', 'ARS', 'PLN', 'HUF', 'CZK', 'BGN', 'RON', 'LKR', 
    'JOD', 'BHD', 'OMR', 'QAR', 'KWD', 'KZT', 'PEN', 'TWD', 'KES', 'UGX', 
    'MAD', 'BAM', 'MKD', 'MNT', 'HRK'
];

// Populate dropdowns with the currencies
const fromCurrencySelect = document.getElementById("from_currency");
const toCurrencySelect = document.getElementById("to_currency");

currencies.forEach(currency => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.textContent = currency;
    fromCurrencySelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.textContent = currency;
    toCurrencySelect.appendChild(optionTo);
});

// Handle form submission and conversion
document.getElementById("currency-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (fromCurrency === toCurrency) {
        alert("Please select different currencies.");
        return;
    }

    // Call the API to fetch the exchange rate and perform conversion
    getExchangeRate(fromCurrency, toCurrency, amount);
});

function getExchangeRate(fromCurrency, toCurrency, amount) {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.rates && data.rates[toCurrency]) {
                const rate = data.rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                document.getElementById("result").textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
            } else {
                document.getElementById("result").textContent = "Error fetching exchange rate.";
            }
        })
        .catch(error => {
            document.getElementById("result").textContent = "Error fetching exchange rate.";
            console.error(error);
        });
}
