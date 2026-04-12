describe('Negative + Navigation Tests', () => {

  // ❌ 1. Wrong Login
  it('Should NOT login with invalid credentials', () => {
    cy.visit('/login')

    cy.get('select').select('Student')

    cy.get('input[placeholder="name@example.com"]')
      .clear({ force: true })
      .type('wrong@email.com')

    cy.get('input[type="password"]')
      .clear({ force: true })
      .type('wrong123')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/login')
    cy.contains('Invalid').should('be.visible')
  })


  // ❌ 2. Empty Login Form
  it('Should NOT login with empty form', () => {
    cy.visit('/login')

    cy.get('input[placeholder="name@example.com"]').clear({ force: true })
    cy.get('input[type="password"]').clear({ force: true })

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/login')
  })


  // 🔓 3. Navigation (No Auth Yet)
  it('Should allow access to home (no auth yet)', () => {
    cy.visit('/home')

    cy.url().should('include', '/home')
  })


  // ❌ 4. Register - Empty Form (FINAL FIXED)
  it('Should show validation errors when register form is empty', () => {
    cy.visit('/register')

    // Clear all inputs
    cy.get('input').each(($el) => {
      cy.wrap($el).clear({ force: true })
    })

    cy.get('button[type="submit"]').click()

    // ✅ Robust validation check
    cy.get('body').then(($body) => {
      const text = $body.text()

      expect(
        text.includes('Please enter your') ||
        text.includes('must')
      ).to.be.true
    })
  })


  // ❌ 5. Weak Password
  it('Should show error for weak password', () => {
    cy.visit('/register')

    cy.get('input[placeholder="your.email@example.com"]')
      .clear({ force: true })
      .type('test@mail.com')

    cy.get('input[placeholder="Enter your first name"]')
      .clear({ force: true })
      .type('John')

    cy.get('input[placeholder="Enter your last name"]')
      .clear({ force: true })
      .type('Doe')

    cy.get('input[placeholder="Choose a username"]')
      .clear({ force: true })
      .type('johndoe')

    cy.get('input[type="password"]').eq(0)
      .clear({ force: true })
      .type('1234')

    cy.get('input[type="password"]').eq(1)
      .clear({ force: true })
      .type('1234')

    cy.get('button[type="submit"]').click()

    cy.contains('at least 8 characters').should('be.visible')
  })

})