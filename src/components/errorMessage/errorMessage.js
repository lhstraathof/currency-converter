import { bool, string } from 'prop-types';
import styles from './errorMessage.module.scss';

export const ErrorMessage = ({ title = 'Error', error, reload = false }) => (
	<div className={styles.error}>
		<h2 className={styles.h2}>{title}</h2>
		<p className={styles.p}>{error}</p>
		{reload && (
			<p className={styles.p}>
				<a href='/' title='reload'>
					Reload Currency Converter and try again
				</a>
			</p>
		)}
	</div>
);

ErrorMessage.propTypes = {
	title: string,
	error: string.isRequired,
	reload: bool,
};
