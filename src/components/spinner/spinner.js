import styles from './spinner.module.scss';

export const Spinner = () => (
	<div className={styles.center} data-testid='spinner'>
		<div className={styles.spinner}></div>
	</div>
);
