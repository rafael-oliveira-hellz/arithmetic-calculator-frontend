import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterInput from '.';

describe('FilterInput Component', () => {
  it('renders the input with the correct placeholder', () => {
    render(
      <FilterInput placeholder='Search here' value='' onChange={() => {}} />
    );

    const inputElement = screen.getByPlaceholderText('Search here');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders the input with the correct value', () => {
    render(
      <FilterInput
        placeholder='Search here'
        value='Test Value'
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByPlaceholderText('Search here');
    expect(inputElement).toHaveValue('Test Value');
  });

  it('calls onChange with the correct value when typed into', () => {
    const mockOnChange = jest.fn();
    render(
      <FilterInput placeholder='Search here' value='' onChange={mockOnChange} />
    );

    const inputElement = screen.getByPlaceholderText('Search here');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('New Value');
  });

  it('passes additional props to the input element', () => {
    render(
      <FilterInput
        placeholder='Search here'
        value=''
        onChange={() => {}}
        data-testid='filter-input'
      />
    );

    const inputElement = screen.getByTestId('filter-input');
    expect(inputElement).toBeInTheDocument();
  });
});
