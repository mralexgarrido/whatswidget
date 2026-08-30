import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('WhatsApp Widget Generator', () => {
  it('renders main application header and get code button', () => {
    render(<App />);
    expect(screen.getByText('WhatsApp Widget')).toBeInTheDocument();
    expect(screen.getByText('Get Code')).toBeInTheDocument();
  });

  it('renders tab options in settings panel', () => {
    render(<App />);
    expect(screen.getByText('Presets')).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Agents')).toBeInTheDocument();
    expect(screen.getByText('Triggers')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Style')).toBeInTheDocument();
  });

  it('allows switching to presets tab and selecting a preset template', () => {
    render(<App />);
    const presetsTab = screen.getByText('Presets');
    fireEvent.click(presetsTab);
    expect(screen.getByText('Ready-made Templates')).toBeInTheDocument();
    expect(screen.getByText('Sales & Inquiries')).toBeInTheDocument();

    const salesPresetBtn = screen.getByText('Sales & Inquiries');
    fireEvent.click(salesPresetBtn);
    expect(
      screen.getAllByText('Ask us about pricing & custom plans').length,
    ).toBeGreaterThan(0);
  });

  it('opens code modal when clicking Get Code', () => {
    render(<App />);
    const getCodeButton = screen.getByText('Get Code');
    fireEvent.click(getCodeButton);

    expect(screen.getByText('Your Custom Widget Code')).toBeInTheDocument();
    expect(screen.getByText('Copy Code')).toBeInTheDocument();
  });
});
