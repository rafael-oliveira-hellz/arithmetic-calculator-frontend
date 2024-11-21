import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from '.';

describe('Text Component', () => {
  it('renders the text content', () => {
    render(<Text>Test Content</Text>);

    const textElement = screen.getByText('Test Content');
    expect(textElement).toBeInTheDocument();
  });

  it('applies the default variant class when no variant is provided', () => {
    render(<Text>Test Content</Text>);

    const textElement = screen.getByText('Test Content');
    expect(textElement).toHaveClass('text-base');
  });

  it('applies the correct class for the small variant', () => {
    render(<Text variant='small'>Test Content</Text>);

    const textElement = screen.getByText('Test Content');
    expect(textElement).toHaveClass('text-sm');
  });

  it('applies the correct class for the medium variant', () => {
    render(<Text variant='medium'>Test Content</Text>);

    const textElement = screen.getByText('Test Content');
    expect(textElement).toHaveClass('text-base');
  });

  it('applies the correct class for the large variant', () => {
    render(<Text variant='large'>Test Content</Text>);

    const textElement = screen.getByText('Test Content');
    expect(textElement).toHaveClass('text-xl font-bold');
  });

  it('applies additional classes from the className prop', () => {
    render(<Text className='custom-class'>Test Content</Text>);

    const textElement = screen.getByText('Test Content');
    expect(textElement).toHaveClass('custom-class');
  });

  it('supports additional props', () => {
    render(
      <Text data-testid='custom-text' id='test-id'>
        Test Content
      </Text>
    );

    const textElement = screen.getByTestId('custom-text');
    expect(textElement).toHaveAttribute('id', 'test-id');
  });
});
