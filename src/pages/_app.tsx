import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider>
        <Head>
          <title>AskaQuest</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
  )
}

export default MyApp
