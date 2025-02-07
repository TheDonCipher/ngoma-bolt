import { setupWorker } from 'msw';
import { handlers } from '../../mocks/handlers';
import '@cypress/code-coverage/support';
import './commands';

beforeEach(() => {
  setupWorker(...handlers).start();
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(address?: string): Chainable<void>;
      connectWallet(address?: string): Chainable<void>;
    }
  }
}
