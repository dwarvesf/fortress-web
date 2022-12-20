import 'antd/dist/antd.css'
import '../styles/index.css'
import React from 'react'
import NProgressHandler from 'components/common/NProgressHandler'
import { AuthContextProvider } from 'context/auth'
import { ThemeProvider } from 'styled-components'
import { theme } from 'styles'
import { NextComponentType, NextPageContext } from 'next'
import { AuthenticatedLayout } from 'components/common/AuthenticatedLayout'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { SEO } from 'components/common/SEO'

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, any>
  pageProps: {}
}) => {
  return (
    <>
      <SEO />
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <AuthenticatedLayout>
              <NProgressHandler />
              <Component {...pageProps} />
            </AuthenticatedLayout>
          </AuthContextProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </>
  )
}
export default MyApp
