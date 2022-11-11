import 'antd/dist/antd.css'
import '../styles/index.css'
import React from 'react'
import NProgressHandler from 'components/common/NProgressHandler'
import Head from 'next/head'
import { AuthContextProvider } from 'context/auth'
import { ThemeProvider } from 'styled-components'
import { theme } from 'styles'
import { NextComponentType, NextPageContext } from 'next'
import { AuthenticatedLayout } from 'components/common/AuthenticatedLayout'
import { GoogleOAuthProvider } from '@react-oauth/google'

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, any>
  pageProps: {}
}) => {
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Fortress | Dwarves Foundation</title>
        <meta
          property="og:title"
          content="NextJS boilerplate | Dwarves Foundation"
        />
        <meta name="twitter:site" content="@dwarvesf" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="description" content="DF Fortress Web V2." />
        <meta property="og:description" content="DF Fortress Web V2." />
        <meta property="og:image" content="/thumbnail.jpeg" />
        <meta name="twitter:image" content="/thumbnail.jpeg" />
      </Head>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
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
