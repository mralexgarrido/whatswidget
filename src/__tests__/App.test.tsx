import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('WhatsApp Widget')).toBeInTheDocument();
  });

  it('renders the Get Code button', () => {
    render(<App />);
    expect(screen.getByText('Get Code')).toBeInTheDocument();
  });
});
