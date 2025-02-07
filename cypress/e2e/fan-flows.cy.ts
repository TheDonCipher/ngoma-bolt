describe('Fan User Flows', () => {
  beforeEach(() => {
    cy.loginFan()
    cy.visit('/')
  })

  it('Fan can explore music', () => {
    cy.visit('/explore');
    cy.get('input[placeholder="Search"]').type('music');
    cy.get('button').contains('Search').click();
    cy.contains('Search Results').should('be.visible');
    // Add more assertions to check for music content in explore page
  })

  it('Fan can create playlists', () => {
    cy.visit('/dashboard/fan/playlists');
    cy.contains('Create Playlist').click();
    cy.get('input[name="playlistName"]').type('My Playlist');
    cy.get('button').contains('Create').click();
    cy.contains('Playlist created successfully').should('be.visible');
    // Add more assertions to check playlist creation
  })

  it('Fan can listen to music', () => {
    cy.visit('/explore'); // Or any page with music tracks
    // Assuming there is a play button for tracks, adjust selector accordingly
    cy.get('button[aria-label="play-track"]').first().click();
    cy.get('audio').should('be.visible').and('not.be.paused');
    // Add assertions to check audio player controls
  })

  it('Fan can make purchases', () => {
    cy.visit('/explore'); // Or album/track detail page
    // Assuming there is a purchase button, adjust selector accordingly
    cy.get('button').contains('Buy').first().click();
    // Mock purchase API call and assert success message
    cy.intercept('POST', '/api/purchase', { statusCode: 200, body: { success: true } }).as('purchase');
    cy.wait('@purchase').then(() => {
      cy.contains('Purchase successful').should('be.visible');
    });
    // Add assertions to check purchase flow
  })
})
