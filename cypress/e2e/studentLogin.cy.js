describe('Student Login Test', () => {
  it('should login successfully', () => {

    cy.visit('/login');

    // ✅ FIXED dropdown selection
    cy.get('select').select('Student');

    cy.get('input[placeholder="name@example.com"]')
      .type('test@gmail.com');

    cy.get('input[type="password"]')
      .type('Test123###');

    cy.get('button[type="submit"]')
      .scrollIntoView()
      .click({ force: true });

    cy.url().should('include', '/home'); // or /dashboard
  });
});