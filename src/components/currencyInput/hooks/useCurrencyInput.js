export const useCurrencyInput = () => {
	const validateInputValue = (e) => {
		const regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
		return e.target.value !== '' ? regex.test(e.target.value) : true;
	};

	return {
		validateInputValue,
	};
};
