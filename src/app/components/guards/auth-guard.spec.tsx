import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import AuthGuard from './auth-guard';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

describe('AuthGuard Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('redirects to /login when user is not authenticated', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(mockPush).toHaveBeenCalledWith('/login');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(mockPush).not.toHaveBeenCalled();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('does not render children while loading', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false
    });

    const { container } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(container.firstChild).toBeNull();
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});
