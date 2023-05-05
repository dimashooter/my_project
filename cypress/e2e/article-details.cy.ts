
let articleId = ''

describe('Join the article details page', () => {

  beforeEach(() => {
    cy.login()
      cy.createArticle().then( (data) => {
        articleId = data.id
        cy.visit(`articles/${data.id}`)
      })
  })
  afterEach(() => {
    cy.removeArticle(articleId)
  })
  it.skip('articles content', () => {
    cy.getById('ArticleDetails.Info').should('exist')
  })
  it.skip('articleRecommendation list', () => {
    cy.getById('ArticleRecommendation.List')
  })

  // it('left comment', () => {
  //   cy.getById('ArticleDetails.Info').should('exist')
  //   cy.getById('CommentForm').scrollIntoView()
  //   cy.addComment('text')
  //   cy.getById('CommentCard.Content').should('have.length',1)  

  // })
  it('rating', () => {
    cy.intercept('GET','**/articles/*',  {fixture:'article-details.json'})
    cy.getById('ArticleDetails.Info').should('exist')
    cy.getById('RatingCard').scrollIntoView()
    cy.addRating()
    cy.getById('ArticleDetails.Info').should('exist')

  })
})
