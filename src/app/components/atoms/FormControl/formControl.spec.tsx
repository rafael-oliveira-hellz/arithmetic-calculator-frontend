import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormControl from '.';

describe('FormControl Component', () => {
  it('renders the FormControl with children', () => {
    render(
      <FormControl>
        <label htmlFor='input'>Label</label>
        <input id='input' type='text' />
      </FormControl>
    );

    const labelElement = screen.getByText('Label');
    const inputElement = screen.getByRole('textbox');

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it('applies additional classes from className prop', () => {
    render(
      <FormControl className='custom-class'>
        <label htmlFor='input'>Label</label>
      </FormControl>
    );

    const divElement = screen.getByText('Label').parentElement;
    expect(divElement).toHaveClass('custom-class');
  });

  it('supports additional HTML attributes', () => {
    render(
      <FormControl data-testid='form-control' role='group'>
        <label htmlFor='input'>Label</label>
      </FormControl>
    );

    const formControlElement = screen.getByTestId('form-control');
    expect(formControlElement).toHaveAttribute('role', 'group');
  });
});
