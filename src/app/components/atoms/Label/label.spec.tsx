import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Label from '.';

describe('Label Component', () => {
  it('renders the label with children text', () => {
    render(<Label>Test Label</Label>);

    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toBeInTheDocument();
  });

  it('applies additional classes from className prop', () => {
    render(<Label className='custom-class'>Test Label</Label>);

    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toHaveClass('custom-class');
  });

  it('supports additional HTML attributes', () => {
    render(<Label htmlFor='test-input'>Test Label</Label>);

    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });
});
