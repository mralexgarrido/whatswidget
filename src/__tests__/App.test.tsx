import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe('WhatsWidget', () => {
  it('renders the branded application header and code button', () => {
    render(<App />);
    expect(screen.getByText('WhatsWidget')).toBeInTheDocument();
    expect(screen.getByText('Get Code')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'View on GitHub' }),
    ).toHaveAttribute('rel', 'noopener noreferrer');
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
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('provides a dedicated mobile preview workspace', () => {
    render(<App />);
    const previewButton = screen.getByRole('button', { name: 'Preview' });
    const customizeButton = screen.getByRole('button', { name: 'Customize' });

    expect(customizeButton).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(previewButton);
    expect(previewButton).toHaveAttribute('aria-pressed', 'true');
    expect(customizeButton).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.getByRole('main', { name: 'Widget preview' }),
    ).toBeInTheDocument();
  });

  it('closes the code dialog with Escape', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Get Code'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
