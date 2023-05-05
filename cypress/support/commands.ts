import { getByTestId } from "cypress/helpers/getByTestId"
import {USER_LOCALSTORAGE_KEY} from  "../../src/shared/const/localstorage"
import {User} from "../../src/entities/User"

import * as articleCommands from './Commands/article'
import * as addComments from './Commands/comments'
import * as ratingCommands from './Commands/rating'

Cypress.Commands.add('login', (username:string = 'testuser', password :string = '123') => { 
  return cy.request({
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
    return body;
  })
 })

 Cypress.Commands.add('getById',(testId:string) => {
     return cy.get(getByTestId(testId))

 })

 Cypress.Commands.addAll(articleCommands)
 Cypress.Commands.addAll(addComments)
 Cypress.Commands.addAll(ratingCommands)



declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<User>
      getById(testId:string): Chainable<JQuery<HTMLElement>>;
    }
  }
}