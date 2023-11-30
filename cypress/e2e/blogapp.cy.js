describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Test User',
      username: 'test user',
      password: 'secret',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('login form is shown', function () {
    cy.contains('Log in to application')

    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('user can be logged in', function () {
      cy.get('#username').type('test user')
      cy.get('#password').type('secret')
      cy.contains('login').click()

      cy.contains('Test User logged in')
    })

    it('login fails with wrong password', function () {
      cy.get('#username').type('test user')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('div')
        .should('contain', 'wrong username or password')

      cy.contains('Test User logged in').should('not.exist')
    })

    it('login fails with wrong username', function () {
      cy.get('#username').type('wrong user')
      cy.get('#password').type('secret')
      cy.contains('login').click()

      cy.get('div')
        .should('contain', 'wrong username or password')

      cy.contains('Test User logged in').should('not.exist')
    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('test user')
      cy.get('#password').type('secret')
      cy.contains('login').click()
    })

    it('shows the front page', function () {
      cy.contains('Bloglist')
      cy.contains('Add a new blog or check the bloglist for interesting reading')
    })
  })
})

