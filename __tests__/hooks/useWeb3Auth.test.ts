import { renderHook } from '@testing-library/react';
import { useWeb3Auth } from '@/lib/hooks/use-web3-auth';
import { typedExpect } from '@/lib/test/test-utils';

// Mock the thirdweb hooks
jest.mock('@thirdweb-dev/react', () => ({
  useAddress: jest.fn(),
  useConnectionStatus: jest.fn(),
  useNetwork: jest.fn().mockReturnValue([{}]),
  useChainId: jest.fn(),
}));

// Mock the web3 store
jest.mock('@/lib/store/use-web3-store', () => ({
  useWeb3Store: () => ({
    setAddress: jest.fn(),
    setConnectionStatus: jest.fn(),
    setChainId: jest.fn(),
    setError: jest.fn(),
  }),
}));

describe('useWeb3Auth', () => {
  describe('when connected', () => {
    beforeEach(() => {
      require('@thirdweb-dev/react').useAddress.mockReturnValue('0x123');
      require('@thirdweb-dev/react').useConnectionStatus.mockReturnValue(
        'connected'
      );
    });

    it('returns connected status', () => {
      const { result } = renderHook(() => useWeb3Auth());

      typedExpect(result.current.isConnected).toBe(true);
      typedExpect(result.current.isConnecting).toBe(false);
    });
  });

  // ...existing code...
});
