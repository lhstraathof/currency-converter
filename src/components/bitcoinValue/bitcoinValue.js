import { string } from 'prop-types';
import { DEFAULT_CRYPTO_CURRENCY } from '@constants';
import { ErrorMessage, Spinner } from '@components';
import useBitcoinValueHooks from './hooks';
import styles from './bitcoinValue.module.scss';

export const BitcoinValue = ({ currency, currencyInput }) => {
	const { data, loading, error } = useBitcoinValueHooks(currency);
	return (
		<>
			{!loading && data && data.rates && (
				<>
					<p className={styles.p}>In Bitcoin</p>
					<p className={styles.p}>
						<strong>{currency}</strong> {currencyInput} = <strong>{DEFAULT_CRYPTO_CURRENCY}</strong>{' '}
						{(1 / data.rates[DEFAULT_CRYPTO_CURRENCY]) * currencyInput}
					</p>
					<p className={`${styles.p} ${styles.pGray}`}>
						<small>
							Based on: <br />
							<strong>{currency}</strong> {data.rates[DEFAULT_CRYPTO_CURRENCY]} ={' '}
							<strong>{DEFAULT_CRYPTO_CURRENCY}</strong> 1
						</small>
					</p>
				</>
			)}
			{loading && <Spinner />}
			{error && <ErrorMessage error={`Could not load ${DEFAULT_CRYPTO_CURRENCY} rate`} />}
		</>
	);
};

BitcoinValue.propTypes = {
	currency: string.isRequired,
	currencyInput: string.isRequired,
};
