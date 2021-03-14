import { useState, useEffect } from 'react';
import {
	API_CURRENCY_LATEST,
	API_CURRENCY_EXCHANGE,
	DEFAULT_FIRST_CURRENCY,
	DEFAULT_SECOND_CURRENCY,
} from '@constants';
import { useDataApi } from '@utils';

export const useApp = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [exchangeError, setExchangeError] = useState();
	const [currencyList, setCurrencyList] = useState([]);
	const [currencyDate, setCurrencyDate] = useState('');
	const [firstCurrency, setFirstCurrency] = useState(DEFAULT_FIRST_CURRENCY);
	const [firstCurrencyInput, setFirstCurrencyInput] = useState('1000');
	const [secondCurrency, setSecondCurrency] = useState(DEFAULT_SECOND_CURRENCY);
	const [secondCurrencyInput, setSecondCurrencyInput] = useState('0');
	const [firstCurrencyActive, setFirstCurrencyActive] = useState(true);
	const [currencyExchange, setCurrencyExchange] = useState();

	/*  
		- START Get Latest Currencies
	*/
	const {
		data: dataApiCurrencyLatest,
		loading: loadingApiCurrencyLatest,
		error: errorApiCurrencyLatest,
		callApi: getApiCurrencyLatestResults,
	} = useDataApi();

	// Run api call on first updated
	useEffect(() => {
		getApiCurrencyLatestResults(API_CURRENCY_LATEST);
	}, [getApiCurrencyLatestResults]);

	useEffect(() => {
		if (dataApiCurrencyLatest) {
			const list = [dataApiCurrencyLatest.base, ...Object.keys(dataApiCurrencyLatest.rates)];

			list && setCurrencyList(list);

			// set date and format dd-mm-yyy
			setCurrencyDate(dataApiCurrencyLatest.date.split('-').reverse().join('-'));

			setCurrencyExchange(dataApiCurrencyLatest.rates[DEFAULT_SECOND_CURRENCY]);
		}
	}, [dataApiCurrencyLatest]);
	/*  
		- END Get Latest Currencies
	*/

	/*  
		- Start Get Exchange Rate
	*/
	const {
		data: dataApiCurrencyExchange,
		error: errorApiCurrencyExchange,
		callApi: getApiCurrencyExchangeResults,
	} = useDataApi();

	useEffect(() => {
		// don't call api when currencies are the same and set exchange to 1
		if (firstCurrency === secondCurrency) {
			return setCurrencyExchange(1);
		}
		getApiCurrencyExchangeResults(API_CURRENCY_EXCHANGE(firstCurrency, secondCurrency));
	}, [firstCurrency, secondCurrency, getApiCurrencyExchangeResults]);

	useEffect(() => {
		if (dataApiCurrencyExchange && dataApiCurrencyExchange.rates) {
			const [firstKey] = Object.keys(dataApiCurrencyExchange.rates);
			setCurrencyExchange(dataApiCurrencyExchange.rates[firstKey]);
		}
	}, [dataApiCurrencyExchange]);
	/*  
		- END Get Exchange Rate
	*/

	/*  
		- START Handle loading an errors
	*/

	useEffect(() => {
		if (!loadingApiCurrencyLatest) {
			setLoading(false);
		}
		if (errorApiCurrencyLatest) {
			console.log(errorApiCurrencyLatest);
			setError(errorApiCurrencyLatest);
		}
		if (errorApiCurrencyExchange) {
			setExchangeError(errorApiCurrencyExchange);
		}
	}, [loadingApiCurrencyLatest, errorApiCurrencyLatest, errorApiCurrencyExchange]);

	/*  
		- END Handle loading an errors
	*/

	/*  
		- START Set Currency Input Based on Exchange Rate
	*/
	useEffect(() => {
		if (firstCurrencyActive && currencyExchange) {
			const input = (firstCurrencyInput * currencyExchange).toFixed(2);
			setSecondCurrencyInput(input);
		}
		if (!firstCurrencyActive && currencyExchange) {
			const input = (secondCurrencyInput / currencyExchange).toFixed(2);
			setFirstCurrencyInput(input);
		}
	}, [currencyExchange, firstCurrencyActive, firstCurrencyInput, secondCurrencyInput]);
	/*  
		- END Set Currency Input Based on Exchange Rate
	*/

	const handleFirstCurrencyInputChange = (input) => {
		setFirstCurrencyActive(true);
		setFirstCurrencyInput(input);
	};

	const handleSecondCurrencyInputChange = (input) => {
		setFirstCurrencyActive(false);
		setSecondCurrencyInput(input);
	};

	const exchangeCurrencies = () => {
		const first = `${firstCurrency}`;
		const second = `${secondCurrency}`;
		setFirstCurrency(second);
		setSecondCurrency(first);
	};

	return {
		state: {
			currencyList,
			currencyDate,
			firstCurrency,
			setFirstCurrency,
			firstCurrencyInput,
			handleFirstCurrencyInputChange,
			secondCurrency,
			setSecondCurrency,
			secondCurrencyInput,
			handleSecondCurrencyInputChange,
			currencyExchange,
			exchangeCurrencies,
		},
		loading,
		error,
		exchangeError,
	};
};
