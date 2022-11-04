import 'antd/dist/antd.css'
import '../styles/index.css'
import React from 'react'
// import App from 'next/app'
import NProgressHandler from 'components/common/NProgressHandler'
import Head from 'next/head'
import { AuthContextProvider } from 'context/auth'
import { ThemeProvider } from 'styled-components'
import { theme } from 'styles'
import { SessionProvider } from 'next-auth/react'
import { NextComponentType, NextPageContext } from 'next'
import { Session } from 'next-auth'

const MyApp = ({
  Component,
  pageProps,
  session,
}: {
  Component: NextComponentType<NextPageContext, any, any>
  pageProps: {}
  session: Session | null
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
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <NProgressHandler />
            <Component {...pageProps} />
          </AuthContextProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}
export default MyApp
