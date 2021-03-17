import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { ErrorMessage } from '@components';

const testData = {
	title: 'title',
	error: 'error',
};

describe('ErrorMessage', () => {
	it('renders correctly', () => {
		render(<ErrorMessage title={testData.title} error={testData.error} />);
		expect(screen.getByText(testData.title)).toBeInTheDocument();
		expect(screen.getByText(testData.error)).toBeInTheDocument();
	});

	it('matches snapshot', () => {
		const component = create(<ErrorMessage title={testData.title} error={testData.error} />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
