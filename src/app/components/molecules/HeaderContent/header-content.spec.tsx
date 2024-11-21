import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderContent from '.';

describe('HeaderContent Component', () => {
  it('renders the app name correctly', () => {
    render(<HeaderContent appName='Test App' />);

    const appNameElement = screen.getByText('Test App');
    expect(appNameElement).toBeInTheDocument();
    expect(appNameElement).toHaveClass('font-bold text-2xl');
  });

  it('renders a link to the home page', () => {
    render(<HeaderContent appName='Test App' />);

    const linkElement = screen.getByRole('link', { name: 'Test App' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
