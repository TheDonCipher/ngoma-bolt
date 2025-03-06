import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConnectWalletButton } from '@/components/web3/connect-wallet-button';
import { typedExpect } from '@/lib/test/test-utils';

// Mock thirdweb hook
jest.mock('@thirdweb-dev/react', () => ({
  useConnectionStatus: jest.fn().mockReturnValue('disconnected'),
  useConnect: jest.fn().mockReturnValue({ connect: jest.fn() }),
}));

describe('ConnectWalletButton', () => {
  it('renders connect button when not connected', () => {
    render(<ConnectWalletButton />);

    typedExpect(screen.getByText(/connect wallet/i)).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<ConnectWalletButton className="custom-class" />);

    typedExpect(screen.getByText(/connect wallet/i)).toBeInTheDocument();
    // Add more assertions if needed
  });
});
