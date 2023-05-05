
export const addRating = (star:number = 5,text:string = 'feedback') => {
  cy.getById(`Rating.${star}`).click()
  cy.getById("Rating.Input").type(text)
  cy.getById("Rating.Button").click() 
}



declare global {
  namespace Cypress {
    interface Chainable {
      addRating(star?:number,text?:string): Chainable<void>
    }
  }
}