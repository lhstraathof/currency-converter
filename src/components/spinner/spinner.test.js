import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { Spinner } from '@components';

describe('Spinner', () => {
	it('renders correctly', () => {
		render(<Spinner />);
		expect(screen.getByTestId('spinner')).toBeInTheDocument();
	});

	it('matches snapshot', () => {
		const component = create(<Spinner />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
