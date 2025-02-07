describe('Artist User Flows', () => {
  beforeEach(() => {
    cy.loginArtist();
    cy.visit('/dashboard/artist');
  });

  describe('Album Management', () => {
    it('should create a new album', () => {
      cy.visit('/dashboard/artist/albums');
      cy.contains('Create Album').click();
      cy.get('input[name="title"]').type('Test Album');
      cy.get('textarea[name="description"]').type('This is a test album description.');
      cy.get('input[name="releaseDate"]').type('2025-02-01');
      cy.get('button[type="submit"]').click();
      cy.contains('Album created successfully').should('be.visible');
    });

    it('should upload tracks to an album', () => {
      cy.visit('/dashboard/artist/albums');
      cy.contains('View Album').first().click(); // Assuming the first album in the list
      cy.contains('Upload Tracks').click();
      cy.get('input[type="file"]').attachFile('test-track.mp3'); // Mock file upload
      cy.get('button').contains('Upload').click();
      cy.contains('Tracks uploaded successfully').should('be.visible');
    });

    it('should manage album details', () => {
      cy.visit('/dashboard/artist/albums');
      cy.contains('View Album').first().click();
      cy.contains('Edit Details').click();
      cy.get('input[name="title"]').clear().type('Updated Album Title');
      cy.get('button[type="submit"]').click();
      cy.contains('Album updated successfully').should('be.visible');
    });
  });

  describe('Profile Management', () => {
    it('should update artist profile', () => {
      cy.visit('/dashboard/artist/settings');
      cy.get('input[name="artistName"]').clear().type('Updated Artist Name');
      cy.get('textarea[name="bio"]').clear().type('Updated artist bio.');
      cy.get('button[type="submit"]').click();
      cy.contains('Profile updated successfully').should('be.visible');
    });
  });

  describe('Earnings and Analytics', () => {
    it('should view earnings dashboard', () => {
      cy.visit('/dashboard/artist/earnings');
      cy.contains('Earnings Report').should('be.visible');
      // Add more assertions to check for earnings data if needed
    });

    it('should view track analytics', () => {
      cy.visit('/dashboard/artist/analytics');
      cy.contains('Track Analytics').should('be.visible');
      // Add more assertions to check for analytics data if needed
    });
  });
});
