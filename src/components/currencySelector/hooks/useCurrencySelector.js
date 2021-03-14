import { useState, useEffect, useRef } from 'react';

export const useCurrencySelector = (currencyList, commonCurrency) => {
	const [dropdownActive, setDropdownActive] = useState(false);
	const [filterText, setFilterText] = useState('');
	const [filteredCurrencyList, setFilteredCurrencyList] = useState([]);
	const selectorRef = useRef(null);

	const handleFilter = (e) => setFilterText(e.target.value);

	useEffect(() => {
		const list = currencyList.filter((currency) =>
			commonCurrency[currency].name.toLowerCase().includes(filterText.toLowerCase()),
		);
		setFilteredCurrencyList(list);
	}, [filterText, currencyList, commonCurrency]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownActive && selectorRef.current && !selectorRef.current.contains(e.target)) {
				setDropdownActive(false);
				e.stopPropagation();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [selectorRef, dropdownActive]);

	return {
		selectorRef,
		dropdownActive,
		setDropdownActive,
		filterText,
		handleFilter,
		filteredCurrencyList,
	};
};
