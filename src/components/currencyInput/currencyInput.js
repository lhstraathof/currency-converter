import { string, func } from 'prop-types';
import useCurrencyInputHooks from './hooks';
import styles from './currencyInput.module.scss';

export const CurrencyInput = ({ currencyInput, handleCurrencyInput }) => {
	const { validateInputValue } = useCurrencyInputHooks();
	return (
		<div className={styles.currencyInput}>
			<input
				className={styles.input}
				value={currencyInput}
				onChange={(e) => {
					validateInputValue(e) && handleCurrencyInput(e.target.value);
				}}
			/>
		</div>
	);
};

CurrencyInput.propTypes = {
	currencyInput: string,
	handleCurrencyInput: func.isRequired,
};
