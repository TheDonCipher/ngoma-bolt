import { renderHook } from '@testing-library/react';
import { useWeb3Auth } from '@/lib/hooks/use-web3-auth';
import { useAddress, useConnectionStatus } from '@thirdweb-dev/react';

jest.mock('@thirdweb-dev/react', () => ({
  useAddress: jest.fn(),
  useConnectionStatus: jest.fn(),
  useChainId: jest.fn(),
}));

describe('useWeb3Auth', () => {
  it('handles successful connection', () => {
    const mockAddress = '0x123';
    (useAddress as jest.Mock).mockReturnValue(mockAddress);
    (useConnectionStatus as jest.Mock).mockReturnValue('connected');

    const { result } = renderHook(() => useWeb3Auth());

    expect(result.current.isConnected).toBe(true);
    expect(result.current.isConnecting).toBe(false);
  });

  it('handles disconnected state', () => {
    (useAddress as jest.Mock).mockReturnValue(null);
    (useConnectionStatus as jest.Mock).mockReturnValue('disconnected');

    const { result } = renderHook(() => useWeb3Auth());

    expect(result.current.isConnected).toBe(false);
    expect(result.current.isDisconnected).toBe(true);
  });
});