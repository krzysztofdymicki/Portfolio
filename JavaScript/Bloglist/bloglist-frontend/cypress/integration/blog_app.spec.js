


describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'Tester',
      username: 'Tester',
      password: 'Tester'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('.login-form-container')
  })

  describe('Login', function() {
    it('succedes with correct credentials', function() {
      cy.get('#username-input')
        .type('Tester')
      cy.get('#password-input')
        .type('Tester')
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('dose not succede with incorrect credentials', function() {
      cy.get('#username-input')
        .type('Tester')
      cy.get('#password-input')
        .type('TesterTester')
      cy.get('#login-button').click()

      cy.contains('Wrong')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'Tester', password: 'Tester'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })
    it('note can be added', function() {
      cy.get('.togglable-button').click()
      cy.get('#title-input')
        .type('New Blog')
      cy.get('#author-input')
        .type('New Author')
      cy.get('#url-input')
        .type('New Url')

      cy.get('#create-button').click()

      cy.contains('New Blog')
    })

    it('user can like a blog', function() {
      cy.get('.togglable-button').click()
      cy.get('#title-input')
        .type('New Blog')
      cy.get('#author-input')
        .type('New Author')
      cy.get('#url-input')
        .type('New Url')

      cy.get('#create-button').click()
      cy.get('.title').click()
      cy.get('.likeButton').click()
      cy.contains('1')

    })

    it('user can delete a blog', function() {
      cy.get('.togglable-button').click()
      cy.get('#title-input')
        .type('New Blog')
      cy.get('#author-input')
        .type('New Author')
      cy.get('#url-input')
        .type('New Url')

      cy.get('#create-button').click()
      cy.get('.title').click()
      cy.get('.removeButton').click()

      cy.get('html').should('not.contain', 'New Blog')
    })


    it.only('blogs are sorted by likes number', function() {
      cy.get('.togglable-button').click()
      cy.get('#title-input')
        .type('First')
      cy.get('#author-input')
        .type('author')
      cy.get('#url-input')
        .type('url')
      cy.get('#create-button').click()
      cy.get('#title-input')
        .type('Second')
      cy.get('#author-input')
        .type('author')
      cy.get('#url-input')
        .type('url')
      cy.get('#create-button').click()
      cy.contains('Second').click()
      cy.get('.likeButton:last').click()
      cy.wait(2000)
      cy.get('.blogcontainer:first').find('.title').should(($title) => {
        expect($title).to.have.text('Second')
      })
    })


  })
})