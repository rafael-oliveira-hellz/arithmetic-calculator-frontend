import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthLink from '.';

describe('AuthLink Component', () => {
  it('renders the preText and link text', () => {
    render(
      <AuthLink
        preText="Don't have an account?"
        text='Sign up'
        href='/signup'
      />
    );

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();

    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('renders the link with the correct href', () => {
    render(
      <AuthLink
        preText='Already have an account?'
        text='Log in'
        href='/login'
      />
    );

    const linkElement = screen.getByText('Log in');
    expect(linkElement.closest('a')).toHaveAttribute('href', '/login');
  });

  it('applies hover styles to the link', () => {
    render(
      <AuthLink preText='Try now:' text='Learn more' href='/learn-more' />
    );

    const linkElement = screen.getByText('Learn more');
    expect(linkElement).toHaveStyle({
      color: 'blue.600'
    });
  });
});
