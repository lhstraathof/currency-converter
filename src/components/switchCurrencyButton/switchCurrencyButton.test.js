import { fireEvent, render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { SwitchCurrencyButton } from '@components';

const testData = {
	action: jest.fn(),
};

describe('SwitchCurrencyButton', () => {
	it('renders correctly', () => {
		render(<SwitchCurrencyButton handleButtonClick={testData.action} />);
		expect(screen.getByTestId('switchCurrencyButton')).toBeInTheDocument();
	});

	it('fires clickAction onClick', () => {
		const { getByTestId } = render(<SwitchCurrencyButton handleButtonClick={testData.action} />);
		const button = getByTestId('switchCurrencyButton');

		fireEvent.click(button);
		expect(testData.action).toHaveBeenCalledTimes(1);
	});

	it('matches snapshot', () => {
		const component = create(<SwitchCurrencyButton handleButtonClick={testData.action} />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
