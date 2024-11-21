import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpinnerIcon from '.';

describe('SpinnerIcon Component', () => {
  it('renders the spinner with default dimensions', () => {
    render(<SpinnerIcon />);
    const spinnerElement = screen.getByTestId('spinner-icon');
    expect(spinnerElement).toHaveStyle({
      width: '24px',
      height: '24px',
      border: '2px solid #FFF',
      borderTop: '2px solid transparent',
      borderRadius: '50%'
    });
  });

  it('renders the spinner with custom dimensions', () => {
    render(<SpinnerIcon width='48px' height='48px' />);
    const spinnerElement = screen.getByTestId('spinner-icon');
    expect(spinnerElement).toHaveStyle({
      width: '48px',
      height: '48px'
    });
  });

  it('applies the spin animation', () => {
    render(<SpinnerIcon />);
    const spinnerElement = screen.getByTestId('spinner-icon');
    expect(spinnerElement).toHaveStyle({
      animation: 'spin 0.8s linear infinite'
    });
  });
});
