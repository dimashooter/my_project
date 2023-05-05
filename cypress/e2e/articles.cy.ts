describe('template spec', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('/articles')
    })
  })

  it('passes', () => {
    cy.getById('ArticleList').should('exist')
    cy.getById('ArticleListItem').should('exist')
  })

  it('on fixtures', () => {
    cy.intercept('GET', '**/articles?*',{fixture:'article.json'})
    cy.getById('ArticleList').should('exist')
    cy.getById('ArticleListItem').should('exist')
  })
  

})
