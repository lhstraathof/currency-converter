import { func } from 'prop-types';
import styles from './switchCurrencyButton.module.scss';
import { ReactComponent as ExchangeIcon } from '@assets/images/exchange-icon.svg';

export const SwitchCurrencyButton = ({ handleButtonClick }) => (
	<button className={styles.switchCurrencyButton} onClick={handleButtonClick}>
		<ExchangeIcon />
	</button>
);

SwitchCurrencyButton.propTypes = {
	handleButtonClick: func.isRequired,
};
