import {USER_LOCALSTORAGE_KEY} from  "../../src/shared/const/localstorage"

Cypress.Commands.add('login', (username:string = 'testuser', password :string = '123') => { 
  cy.request({
    method: 'POST',
    url: `http://localhost:8000/login`,
    body: {
      username,
      password,
      },
  }).then(({ body }) => {
  
    const item = {
      body: {
        ...body,
      }
    }
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(item))
  })
 })

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>
    }
  }
}