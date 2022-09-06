import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AskaQuest</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="author" content="Askaquest team"/>
        <meta name="keywords" content="Nextjs, Questions, Answers"/>
        <meta name="description" content="A free online app to display, create an post questions to let your friends answer them!"/>
        <meta property="og:title" content="Askaquest" key="title" />
        <meta property="og:site_name" content="Askaquest" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://askaquest.vercel.app/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:description" content="A free online app to display, create an post questions to let your friends answer them!" />

      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
