import { DEFAULT_FIRST_CURRENCY } from '@constants';

const apiKey = process.env.REACT_APP_CRYPTO_API_KEY;

const DEFAULT_CRYPTO_CURRENCY = 'BTC';
const API_CRYPTO_BASE = `http://api.coinlayer.com/api/live?access_key=${apiKey}`;
const API_CRYPTO_EXCHANGE = (
	fromCurrency = DEFAULT_FIRST_CURRENCY,
	toCurrency = DEFAULT_CRYPTO_CURRENCY,
) => `${API_CRYPTO_BASE}&target=${fromCurrency}&symbols=${toCurrency}`;

export { DEFAULT_CRYPTO_CURRENCY, API_CRYPTO_BASE, API_CRYPTO_EXCHANGE };
