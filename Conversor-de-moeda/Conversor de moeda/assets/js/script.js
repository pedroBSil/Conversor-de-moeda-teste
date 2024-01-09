const currencySymbols = {
    usd: '$',
    eur: '€',
    btc: '₿',
    brl: 'R$'
};


const exchangeRates = {
    usd: {
        eur: 0.91,
        btc: 0.000023,
        brl: 4.91
    },
    eur: {
        usd: 1.09,
        btc: 0.000025,
        brl: 6.38
    },
    btc: {
        usd: 43476,
        eur: 39732,
        brl: 211805
    },
    brl: {
        usd: 0.21,
        eur: 0.19,
        btc: 0.0000047
    }
};

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;

    if (isNaN(amount)) {
        alert('Por favor, insira uma quantidade válida.');
        return;
    }

    if (!exchangeRates[fromCurrency] || !exchangeRates[fromCurrency][toCurrency]) {
        alert('As taxas de câmbio não estão disponíveis para essa conversão.');
        return;
    }

    const result = amount * exchangeRates[fromCurrency][toCurrency];

    const resultSymbol = currencySymbols[toCurrency];
    document.getElementById('result').innerText = `${currencySymbols[fromCurrency]} ${amount} é igual a ${resultSymbol} ${toCurrency == 'btc'? result.toFixed(4) : result.toFixed(2)} `;
}




