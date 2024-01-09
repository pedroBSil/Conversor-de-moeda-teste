// script.js
const fiatApiUrl = 'https://v6.exchangerate-api.com/v6/f5b6a917c66e03839c10ea57/latest/brl';
const cryptoApiUrl = '';

const currencySymbols = {
    AED: 'د.إ',
    AUD: '$',
    CZK: 'Kč',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    PLN: 'zł',
    RUB: '₽',
    USD: '$',
    BTC: '₿',
    ETH: 'Ξ',
    LTC: 'Ł'
};

function convertCurrency(type) {
    const amountInput = document.getElementById(`amount${type}`);
    const currencySelect = document.getElementById(`${type === 'fiat' ? 'currencyfiat' : 'crypto'}`);
    const resultParagraph = document.getElementById(`result${type === 'fiat' ? 'fiat' : 'crypto'}`);

    const amountValue = amountInput.value.trim();
    console.log('Valor inserido:', amountValue);

    const amount = parseFloat(amountValue);

    if (isNaN(amount)) {
        resultParagraph.innerHTML = 'Por favor, insira um valor numérico válido.';
        return;
    }

    const currency = currencySelect.value;

    const apiUrl = type === 'fiat' ? fiatApiUrl : cryptoApiUrl;
    console.log(apiUrl);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then(data => {
            let exchangeRate;

            if (type === 'fiat') {
                // Verificar se 'conversion_rates' existe antes de acessá-lo
                if (data.conversion_rates) {
                    exchangeRate = data.conversion_rates[currency];
                } else {
                    throw new Error('Dados da API não contêm as taxas de conversão esperadas.');
                }
            } else {
                const cryptoData = data;
                const cryptoId = currency.toLowerCase();
                // Verificar se 'cryptoData[cryptoId]' existe antes de acessá-lo
                exchangeRate = cryptoData[cryptoId] ? cryptoData[cryptoId].usd : null;
            }

            if (exchangeRate) {
                const convertedAmount = amount * exchangeRate;
                const symbol = currencySymbols[currency] || currency;
                resultParagraph.innerHTML = `${amount.toFixed(2)} BRL é equivalente a ${symbol} ${convertedAmount.toFixed(2)}`;
            } else {
                resultParagraph.innerHTML = `Erro ao obter taxa de câmbio para a ${type === 'fiat' ? 'moeda' : 'criptomoeda'} selecionada.`;
            }
        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
            resultParagraph.innerHTML = `Erro ao converter ${type === 'fiat' ? 'moeda' : 'criptomoeda'}. Tente novamente mais tarde.`;
        });
}
