import '@testing-library/jest-dom';
import { server } from './mocks/server';
import { mockStore } from '@/lib/test/mockStore';

// Extend Jest matchers
import '@testing-library/jest-dom/extend-expect';

// Mock the store
jest.mock('@/lib/store/player', () => ({
  usePlayerStore: jest.fn().mockImplementation(() => mockStore),
}));

// Mock window.gtag
Object.defineProperty(window, 'gtag', {
  value: jest.fn(),
  writable: true,
});

// Make sure the global expect includes Jest DOM matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveBeenCalledWith(...args: any[]): R;
      toHaveLength(expected: number): R;
      toBe(expected: any): R;
      toBeDefined(): R;
    }
  }
}

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
