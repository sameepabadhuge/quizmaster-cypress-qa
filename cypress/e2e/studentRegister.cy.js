describe('Student Register Test', () => {
  it('should register student successfully', () => {

    // 🔥 Dynamic data (avoid duplicates)
    const email = `student${Date.now()}@gmail.com`;
    const username = `user${Date.now()}`;

    // Visit page
    cy.visit('/register');

    // Ensure correct role
    cy.contains('Student').click();

    // Fill form
    cy.get('input[placeholder="Enter your first name"]')
      .should('be.visible')
      .type('Test');

    cy.get('input[placeholder="Enter your last name"]')
      .type('User');

    cy.get('input[placeholder="Choose a username"]')
      .clear()
      .type(username);

    cy.get('input[placeholder="your.email@example.com"]')
      .clear()
      .type(email)
      .should('have.value', email); // 🔥 ensure correct input

    cy.get('input[type="password"]').eq(0)
      .type('Test123###');

    cy.get('input[type="password"]').eq(1)
      .type('Test123###');

    // 🔥 Ensure button ready
    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('not.be.disabled');

    // 🔥 Real click fix
    cy.get('button[type="submit"]')
      .scrollIntoView()
      .click({ force: true });

    // 🔥 Final assertion
    cy.url().should('include', '/login');

  });
});