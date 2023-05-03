import { getByTestId } from "cypress/helpers/getByTestId"

describe('routing', () => {
  describe('mainpage', () => {
    it('passes', () => {
      cy.visit('/')
      cy.get(getByTestId('MainPage')).should('exist')
    })
  })
  describe('aboutPage', () => {
    it('passes', () => {
      cy.visit('/about')
      cy.get(getByTestId('AboutPage')).should('exist')
    })
  })
  describe('ProfilePage', () => {
    it('passes', () => {
      cy.visit('/profile/1')
      cy.get(getByTestId('MainPage')).should('exist')
    })
  })
  describe('NotFoundPage', () => {
    it('passes', () => {
      cy.visit('/dsadadsa')
      cy.get(getByTestId('NotFoundPage')).should('exist')
    })
  })

  describe('Authenticated user', () => {
    beforeEach( () => {
      cy.login()
    })
    it('passes', () => {
      cy.visit('/profile/1')
      cy.get(getByTestId('ProfilePage')).should('exist')
    })
    it('passes', () => {
        cy.visit('articles')
      cy.get(getByTestId('ArticlesPage')).should('exist')
    })
  })
})