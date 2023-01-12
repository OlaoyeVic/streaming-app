import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import '../styles/globals.scss'
import '../styles/home.scss'
import '../styles/faq.scss'
import '../styles/footer.scss'
import '../styles/navbar.scss'
import '../styles/sidebar.scss'
import '../styles/welcome.scss'
import '../styles/browse.scss'
import '../styles/id.scss'

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState}>) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
