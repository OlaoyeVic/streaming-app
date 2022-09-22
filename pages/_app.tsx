import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import '../styles/home.scss'
import '../styles/faq.scss'
import '../styles/footer.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <> 
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
