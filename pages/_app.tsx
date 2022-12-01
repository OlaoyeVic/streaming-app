import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'

import '../styles/globals.scss'
import '../styles/home.scss'
import '../styles/faq.scss'
import '../styles/footer.scss'
import '../styles/navbar.scss'
import '../styles/sidebar.scss'
import '../styles/welcome.scss'
import '../styles/browse.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

export default MyApp
