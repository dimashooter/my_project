
export const addComment = (message:string) => {
  cy.getById("CommentForm.Input").type(message)
  cy.getById("CommentForm.Button").click()
}



declare global {
  namespace Cypress {
    interface Chainable {
      addComment(message:string): Chainable<void>
    }
  }
}