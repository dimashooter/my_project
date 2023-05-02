import { screen } from "@testing-library/react"
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender"
import AppRouter from "./AppRouter"
import { getRouteAbout } from "@/shared/config/routeConfig/routeConfig"

describe('app/router/Approuter', () => {
  test('render page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout()
    })

    const page = await screen.findByTestId('AboutPage')
    expect(page).toBeInTheDocument()
  })

  test('render page', async () => {
    componentRender(<AppRouter />, {
      route: '/sdadadadsa'
    })
    const page = await screen.findByTestId('NotFoundPage')
    expect(page).toBeInTheDocument()
  })
})