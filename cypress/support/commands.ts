declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(address?: string): Chainable<Subject>
    connectWallet(address?: string): Chainable<Subject>
    loginArtist(address?: string): Chainable<Subject>
    loginAdmin(address?: string): Chainable<Subject>
    loginFan(address?: string): Chainable<Subject>
    attachFile(filePath: string): Chainable<Subject>
  }
}

Cypress.Commands.add('login', (address = '0x123') => {
  cy.window().then((window) => {
    window.localStorage.setItem('web3-storage', JSON.stringify({
      address,
      lastConnectedChainId: 84532,
    }));
  });
})

Cypress.Commands.add('connectWallet', (address = '0x123') => {
  cy.window().then((window) => {
    window.ethereum = {
      request: () => Promise.resolve([address]),
      on: () => { },
      removeListener: () => { },
    }
  })

  cy.get('button').contains('Connect Wallet').click()
})

Cypress.Commands.add('loginArtist', (address = '0x456') => {
  cy.window().then((window) => {
    window.localStorage.setItem('web3-storage', JSON.stringify({
      address,
      lastConnectedChainId: 84532,
    }))
  })
})

Cypress.Commands.add('loginAdmin', (address = '0x789') => {
  cy.window().then((window) => {
    window.localStorage.setItem('web3-storage', JSON.stringify({
      address,
      lastConnectedChainId: 84532,
    }))
  })
})

Cypress.Commands.add('loginFan', (address = '0xabc') => {
  cy.window().then((window) => {
    window.localStorage.setItem('web3-storage', JSON.stringify({
      address,
      lastConnectedChainId: 84532,
    }))
  })
})

Cypress.Commands.add('attachFile', () => {
  // This command is already provided by cypress-file-upload, so no implementation needed here
  // The type definition is enough to resolve the TypeScript error
})
