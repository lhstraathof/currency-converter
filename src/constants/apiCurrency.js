const today = new Date();
const oneMonthAgo = new Date(
	new Date().getFullYear(),
	new Date().getMonth() - 1,
	new Date().getDate(),
);
// format date in yyy-mm-dd
const oneMonthAgoFormatted = today.toISOString().slice(0, 10);
const todayFormatted = oneMonthAgo.toISOString().slice(0, 10);

const DEFAULT_FIRST_CURRENCY = 'EUR';
const DEFAULT_SECOND_CURRENCY = 'USD';
const API_CURRENCY_BASE_URL = 'https://api.exchangeratesapi.io';
const API_CURRENCY_LATEST = `${API_CURRENCY_BASE_URL}/latest`;
const API_CURRENCY_EXCHANGE = (
	fromCurrency = DEFAULT_FIRST_CURRENCY,
	toCurrency = DEFAULT_SECOND_CURRENCY,
) => `${API_CURRENCY_LATEST}?base=${fromCurrency}&symbols=${toCurrency}`;
const API_CURRENCY_EXCHANGE_HISTORY = (
	fromCurrency = DEFAULT_FIRST_CURRENCY,
	toCurrency = DEFAULT_SECOND_CURRENCY,
	startDate = todayFormatted,
	endDate = oneMonthAgoFormatted,
) =>
	`${API_CURRENCY_BASE_URL}/history?base=${fromCurrency}&symbols=${toCurrency}&start_at=${startDate}&end_at=${endDate}`;

export {
	DEFAULT_FIRST_CURRENCY,
	DEFAULT_SECOND_CURRENCY,
	API_CURRENCY_BASE_URL,
	API_CURRENCY_LATEST,
	API_CURRENCY_EXCHANGE,
	API_CURRENCY_EXCHANGE_HISTORY,
};
