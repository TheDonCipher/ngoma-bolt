describe('Admin User Flows', () => {
  beforeEach(() => {
    cy.loginAdmin();
    cy.visit('/dashboard/admin');
  });

  describe('Admin Dashboard Access', () => {
    it('should access admin dashboard', () => {
      cy.contains('Admin Dashboard').should('be.visible');
      cy.contains('Users').should('be.visible'); // Example: Check for Users link/section
      cy.contains('Albums').should('be.visible'); // Example: Check for Albums link/section
      // Add more assertions to check for key admin dashboard elements
    });
  });

  describe('User Management', () => {
    it('should view users list', () => {
      cy.visit('/dashboard/admin/users'); // Assuming users management path
      cy.contains('Users Management').should('be.visible');
      // Add assertions to check for user list table/elements
    });

    it('should edit user details', () => {
      cy.visit('/dashboard/admin/users');
      cy.contains('Edit').first().click(); // Assuming edit button for the first user
      cy.contains('Edit User Details').should('be.visible');
      // Add assertions to check for user edit form and actions
    });
  });

  describe('Album Management', () => {
    it('should view albums list', () => {
      cy.visit('/dashboard/admin/albums'); // Assuming albums management path
      cy.contains('Albums Management').should('be.visible');
      // Add assertions to check for albums list table/elements
    });

    it('should edit album details', () => {
      cy.visit('/dashboard/admin/albums');
      cy.contains('Edit').first().click(); // Assuming edit button for the first album
      cy.contains('Edit Album Details').should('be.visible');
      // Add assertions to check for album edit form and actions
    });
  });
});
