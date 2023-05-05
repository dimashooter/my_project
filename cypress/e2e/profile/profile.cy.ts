
describe('routing', () => {
  describe('mainpage', () => {
    it('passes', () => {
      cy.login().then(data => {
        cy.visit(`/profile/${data.id}`)
        cy.getById('ProfilePage.firstname').should('have.value','Dima')
      })
    })
  })
})