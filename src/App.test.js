import { render, screen } from '@testing-library/react';
import App from './App';

test('renders contect four board', () => {
  render(<App />);
  const element = screen.getByText(/Connect 4/i);
  expect(element).toBeInTheDocument();
});
