import { useEffect } from 'react';
import { useDataApi } from '@utils';
import { API_CRYPTO_EXCHANGE } from '@constants';

export const useBitcoinValue = (currency) => {
	const { callApi, data, loading, error } = useDataApi();

	useEffect(() => {
		callApi(API_CRYPTO_EXCHANGE(currency));
	}, [currency, callApi]);

	return {
		data,
		loading,
		error,
		callApi,
	};
};
