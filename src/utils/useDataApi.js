import { useEffect, useState } from 'react';

export const useDataApi = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [apiUrl, setApiUrl] = useState();
	const [data, setData] = useState(null);

	useEffect(() => {
		if (apiUrl) {
			fetch(apiUrl)
				.then((response) => response.json())
				.then((response) => {
					console.log(response);
					if (response && response.error) {
						setError(response.error);
						return setLoading(false);
					}
					setData(response);
					setLoading(false);
				})
				.catch((error) => {
					setError(error);
					setLoading(false);
				});
		}
	}, [apiUrl]);
	return { data, loading, error, callApi: setApiUrl };
};
