import { render } from '@testing-library/react';
import { App } from '@components';

it('renders App without crashing', () => {
	render(<App />);
});
