import '@testing-library/jest-dom';

// Augment the global Jest types
declare global {
  // Extend the Jest namespace
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveBeenCalledWith(...args: any[]): R;
      toHaveLength(expected: number): R;
      toBe(expected: any): R;
      toBeDefined(): R;
    }
  }

  // Extend the expect namespace
  namespace expect {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveBeenCalledWith(...args: any[]): R;
      toHaveLength(expected: number): R;
      toBe(expected: any): R;
      toBeDefined(): R;
    }
    function stringContaining(expected: string): any;
  }
}

// This empty export turns this file into a module
export {};
