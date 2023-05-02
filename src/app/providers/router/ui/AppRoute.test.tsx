import { componentRender } from "@/shared/lib/tests/componentRender/componentRender"
import AppRouter from "./AppRouter"

describe('app/router/Approuter', () => {
  test('render page', () => {
    componentRender(<AppRouter />, {

    })
  })
})