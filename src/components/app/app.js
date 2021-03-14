import useAppHooks from './hooks';
import styles from './app.module.scss';
import {
	BitcoinValue,
	CurrencyInput,
	CurrencySelector,
	ErrorMessage,
	Spinner,
	SwitchCurrencyButton,
} from '@components';

export const App = () => {
	const { state, loading, error, exchangeError } = useAppHooks();
	return (
		<div className={styles.app}>
			<main className={styles.main}>
				{loading && <Spinner />}
				{!loading && !error && state.currencyList && (
					<>
						<h2 className={styles.h2}>Currency Converter</h2>
						<p className={styles.p}>
							Based on the exchange rates of European Central Bank
							<br />
							on <strong>{state.currencyDate}</strong>
						</p>
						{exchangeError && (
							<div className={styles.error}>
								<p className={styles.p}>Error with API, please try again</p>
								<p className={styles.p}>
									<strong>Details</strong>
									<br />
									{exchangeError}
								</p>
							</div>
						)}
						<div className={styles.row}>
							<div className={styles.col}>
								<CurrencySelector
									selectedCurrency={state.firstCurrency}
									handleSelectionChange={state.setFirstCurrency}
									currencyList={state.currencyList}
									target='From'
								/>
								<CurrencyInput
									handleCurrencyInput={state.handleFirstCurrencyInputChange}
									currencyInput={state.firstCurrencyInput}
								/>
							</div>
							<div className={styles.colSmall}>
								<SwitchCurrencyButton handleButtonClick={state.exchangeCurrencies} />
							</div>
							<div className={styles.col}>
								<CurrencySelector
									selectedCurrency={state.secondCurrency}
									handleSelectionChange={state.setSecondCurrency}
									currencyList={state.currencyList}
									target='To'
								/>
								<CurrencyInput
									handleCurrencyInput={state.handleSecondCurrencyInputChange}
									currencyInput={state.secondCurrencyInput}
								/>
							</div>
						</div>
						<hr className={styles.hr} />
						<div className={styles.row}>
							<div className={styles.col}>
								<BitcoinValue
									currency={state.firstCurrency}
									currencyInput={state.firstCurrencyInput}
								/>
							</div>
						</div>
					</>
				)}
				{error && <ErrorMessage error={error} reload />}
			</main>
		</div>
	);
};
