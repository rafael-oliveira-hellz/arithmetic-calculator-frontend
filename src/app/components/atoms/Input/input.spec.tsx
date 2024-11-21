import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '.';

describe('Input Component', () => {
  it('renders the input element', () => {
    render(<Input placeholder='Enter text' />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('applies additional classes from className prop', () => {
    render(<Input placeholder='Enter text' className='custom-class' />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toHaveClass('custom-class');
  });

  it('supports required prop', () => {
    render(<Input placeholder='Enter text' required />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toHaveAttribute('required');
  });

  it('supports custom inputSize prop', () => {
    render(<Input placeholder='Enter text' inputSize='lg' />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toHaveClass('px-4', 'py-3', 'text-lg');
  });

  it('handles user input correctly', () => {
    render(<Input placeholder='Enter text' />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    fireEvent.change(inputElement, { target: { value: 'Test input' } });

    expect(inputElement).toHaveValue('Test input');
  });
});
