import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserActions from '.';
import { UserActionsProps } from '@/shared/interfaces/user-actions-props';

describe('UserActions Component', () => {
  const defaultProps: UserActionsProps = {
    username: 'John Doe',
    onLogout: jest.fn()
  };

  it('should render the username', () => {
    render(<UserActions {...defaultProps} />);
    expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
  });

  it('should render the logout button', () => {
    render(<UserActions {...defaultProps} />);
    const button = screen.getByRole('button', { name: /logout/i });
    expect(button).toBeInTheDocument();
  });

  it('should call onLogout when logout button is clicked', () => {
    render(<UserActions {...defaultProps} />);
    const button = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(button);
    expect(defaultProps.onLogout).toHaveBeenCalledTimes(1);
  });
});
