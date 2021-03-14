import { array, string, func } from 'prop-types';
import commonCurrency from '@assets/Common-Currency.json';
import useCurrencySelector from './hooks';
import styles from './currencySelector.module.scss';

export const CurrencySelector = ({
	currencyList,
	selectedCurrency,
	handleSelectionChange,
	target,
}) => {
	const {
		selectorRef,
		dropdownActive,
		setDropdownActive,
		filterText,
		handleFilter,
		filteredCurrencyList,
	} = useCurrencySelector(currencyList, commonCurrency);
	return (
		<div
			className={styles.currencySelector}
			ref={selectorRef}
			aria-expanded={dropdownActive}
			aria-owns={`${target}-dropdown`}
			aria-haspopup='listbox'
		>
			<button
				className={`${styles.button} ${styles.selector}`}
				onClick={() => {
					setDropdownActive(true);
				}}
			>
				<div className={styles.top}>{target}</div>
				<div className={styles.bottom}>
					<div className={styles.left}>
						<span className={styles.selectedCurrency}>
							{selectedCurrency} - {commonCurrency[selectedCurrency].name}
						</span>
					</div>
					<div className={styles.right}>
						<span className={styles.flagCircle}>
							<img
								className={styles.flag}
								src={
									require(`@assets/images/square-flags/${selectedCurrency.toLowerCase()}.svg`)
										.default
								}
								alt={commonCurrency[selectedCurrency].name}
							/>
						</span>
						<span className={styles.chevron}>{dropdownActive ? '▲' : '▼'}</span>
					</div>
				</div>
			</button>
			{dropdownActive && (
				<div className={styles.dropdown} role='listbox' id={`${target}-dropdown`}>
					<div className={styles.filter}>
						<img
							className={styles.searchIcon}
							src={require('@assets/images/search-icon.svg').default}
							alt='search icon'
						/>
						<input
							className={styles.filterInput}
							type='text'
							placeholder='Search Currency'
							value={filterText}
							onChange={(e) => handleFilter(e)}
							aria-controls={`${target}-dropdown`}
						/>
					</div>
					<ul className={styles.ul}>
						{filteredCurrencyList.map((currency) => (
							<li className={styles.li} key={currency}>
								<button
									className={`${styles.button} ${styles.dropdownButton}`}
									onClick={() => {
										handleSelectionChange(currency);
										setDropdownActive(false);
									}}
								>
									<span className={styles.flagCircle}>
										<img
											className={styles.flag}
											src={
												require(`@assets/images/square-flags/${currency.toLowerCase()}.svg`).default
											}
											alt={commonCurrency[currency].name}
										/>
									</span>
									<span className={styles.dropdownButtonText}>
										{currency} - {commonCurrency[currency].name}
									</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

CurrencySelector.propTypes = {
	currencyList: array.isRequired,
	selectedCurrency: string.isRequired,
	handleSelectionChange: func.isRequired,
	target: string.isRequired,
};
