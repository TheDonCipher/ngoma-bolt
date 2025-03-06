import { handlers } from '../../mocks/handlers';
import '@cypress/code-coverage/support';
import './commands';

// Mock MSW setup for Cypress
const mockMsw = {
  start: () => console.log('Mock Service Worker started'),
  stop: () => console.log('Mock Service Worker stopped'),
};

beforeEach(() => {
  // Initialize mock service worker with handlers
  mockMsw.start();
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(address?: string): Chainable<void>;
      connectWallet(address?: string): Chainable<void>;
    }
  }
}

// Export to make TypeScript happy
export {};
