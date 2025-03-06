import React from 'react';
import '@testing-library/jest-dom';

// Custom expect function with proper typing for all Jest DOM matchers
export const typedExpect = <T extends any>(actual: T) => {
  return {
    ...expect(actual),
    toBeInTheDocument: () => (expect(actual) as any).toBeInTheDocument(),
    toHaveBeenCalledWith: (...args: any[]) =>
      (expect(actual) as any).toHaveBeenCalledWith(...args),
    toHaveBeenCalled: () => (expect(actual) as any).toHaveBeenCalled(),
    toBe: (expected: any) => (expect(actual) as any).toBe(expected),
    toBeDefined: () => (expect(actual) as any).toBeDefined(),
    toHaveLength: (length: number) =>
      (expect(actual) as any).toHaveLength(length),
  };
};

// Custom expect helpers
export const expectHelpers = {
  stringContaining: (expected: string) => ({
    asymmetricMatch: (actual: string) => {
      return actual.includes(expected);
    },
    toString: () => `StringContaining(${expected})`,
  }),

  stringMatching: (expected: RegExp | string) => {
    const regex =
      typeof expected === 'string' ? new RegExp(expected) : expected;
    return {
      asymmetricMatch: (actual: string) => {
        return regex.test(actual);
      },
      toString: () => `StringMatching(${expected})`,
    };
  },

  any: (constructor: any) => ({
    asymmetricMatch: (actual: any) => {
      return constructor === String
        ? typeof actual === 'string'
        : actual && actual.constructor === constructor;
    },
    toString: () => `Any(${constructor.name})`,
  }),
};

// Make sure expectHelpers is actually exported
