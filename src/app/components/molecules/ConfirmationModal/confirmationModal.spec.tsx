import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmationModal from '.';

describe('ConfirmationModal Component', () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    render(
      <ConfirmationModal
        isOpen={false}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        message='Are you sure you want to proceed?'
      />
    );

    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        message='Are you sure you want to proceed?'
      />
    );

    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to proceed?')
    ).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onConfirm when the Confirm button is clicked', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        message='Are you sure you want to proceed?'
      />
    );

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the Cancel button is clicked', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        message='Are you sure you want to proceed?'
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
