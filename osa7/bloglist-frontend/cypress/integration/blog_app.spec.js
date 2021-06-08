describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    //create user to backend
    const user = {
      name: 'test user',
      username: 'testuser',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function(){
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function(){
      cy.login({ username:'testuser', password:'1234' })
      cy.contains('test user logged in')
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('unknown')
      cy.get('#pass').type('123454')
      cy.get('#login-btn').click()
      cy.get('.error').should('contain', 'Wrong username or password!')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })


    //when logged in tests
    describe('When logged in', function() {
      beforeEach(function() {
      // log in user here
        cy.login({ username:'testuser', password:'1234' })
      })

      it('A blog can be created', function() {
        cy.createBlog({
          title: 'Amazing cypress library',
          author: 'Cypress Team',
          url: 'www.cypress.com',
          likes: 0
        })

        cy.visit('http://localhost:3000')
        cy.contains('Amazing cypress library')
      })

      describe('When blog created', function(){
        beforeEach(function(){
          cy.createBlog({
            title: 'Amazing cypress library',
            author: 'Cypress Team',
            url: 'www.cypress.com',
            likes: 0
          })
          cy.visit('http://localhost:3000')
          cy.contains('Amazing cypress library')
        })


        it('Post can be liked', function(){
          cy.contains('view').click()
          cy.get('#likeBtn').click()
          cy.contains('likes: 1')
          cy.visit('http://localhost:3000')
        })

        it('Post can be removed by owner', function(){
          cy.contains('view').click()
          cy.contains('Remove').click()
          cy.get('Remove').should('not.exist')
        })
      })


      describe('When many blogs is created', function() {
        beforeEach(() => {
          cy.createBlog({ title:'Blog1', author:'user1', url:'blog1.com', likes:5 })
          cy.createBlog({ title:'Blog2', author:'user2', url:'blog2.com', likes:34 })
          cy.createBlog({ title:'Blog3', author:'user3', url:'blog3.com', likes:2 })
          cy.createBlog({ title:'Blog4', author:'user4', url:'blog4.com', likes:7 })
        })

        it.only('blogs is shown in DESC order', function(){
          cy.visit('http://localhost:3000')
          cy.get('.blogParent:first').contains('Blog2')
          cy.get('.blogParent:first').next().contains('Blog4')
          cy.get('.blogParent:first').next().next().contains('Blog1')
          cy.get('.blogParent:first').next().next().next().contains('Blog3')
        })

      })
    })
  })
})