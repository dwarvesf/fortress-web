import { RouterContext } from 'next/dist/shared/lib/router-context' // next 11.2
import themeLess from '!!raw-loader!../src/styles/variables.less'
import { addDecorator } from '@storybook/react'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import { ThemeProvider } from 'styled-components'
import { theme } from '../src/styles/theme'
import '../src/styles/index.css'

addDecorator(withThemesProvider([theme], ThemeProvider))

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  customizeAntdTheme: {
    modifyVars: themeLess,
  },
}
