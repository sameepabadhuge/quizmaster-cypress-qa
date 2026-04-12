describe('Full E2E Flow - Register + Login', () => {
  it('should register and login successfully', () => {

    const email = `student${Date.now()}@gmail.com`;
    const username = `user${Date.now()}`;
    const password = 'Test123###';

    // 🔥 REGISTER
    cy.visit('/register');

    cy.contains('Student').click();

    cy.get('input[placeholder="Enter your first name"]').type('Test');
    cy.get('input[placeholder="Enter your last name"]').type('User');

    cy.get('input[placeholder="Choose a username"]').type(username);

    cy.get('input[placeholder="your.email@example.com"]')
      .clear()
      .type(email);

    cy.get('input[type="password"]').eq(0).type(password);
    cy.get('input[type="password"]').eq(1).type(password);

    cy.get('button[type="submit"]')
      .scrollIntoView()
      .click({ force: true });

    cy.url().should('include', '/login');

    // 🔥 LOGIN
    cy.get('select').select('Student');

    cy.get('input[placeholder="name@example.com"]').type(email);
    cy.get('input[type="password"]').type(password);

    cy.get('button[type="submit"]')
      .scrollIntoView()
      .click({ force: true });

    // 🔥 FINAL ASSERTION
    cy.url().should('include', '/home');

    cy.contains('Welcome').should('exist'); // UI validation
  });
});