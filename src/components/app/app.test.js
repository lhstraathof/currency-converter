import { render, screen } from '@testing-library/react';
import { App } from './index';

it('renders App without crashing', () => {
	render(<App />);
});
