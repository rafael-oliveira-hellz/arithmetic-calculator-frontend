import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from '.';

describe('Logo Component', () => {
  it('renders the logo with the provided text', () => {
    render(<Logo text='MyLogo' />);

    const logoText = screen.getByText('MyLogo');
    expect(logoText).toBeInTheDocument();
  });

  it('applies default fontSize and color', () => {
    render(<Logo text='MyLogo' />);

    const logoText = screen.getByText('MyLogo');
    expect(logoText).toHaveStyle({ fontSize: 'xl', color: 'white' });
  });

  it('overrides fontSize and color with provided props', () => {
    render(<Logo text='MyLogo' fontSize='2xl' color='blue' />);

    const logoText = screen.getByText('MyLogo');
    expect(logoText).toHaveStyle({ fontSize: '2xl', color: 'blue' });
  });

  it('contains a link to the homepage', () => {
    render(<Logo text='MyLogo' />);

    const logoLink = screen.getByRole('link', { name: 'Página inicial' });
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
