import '../styles/global-style.css'
import '../styles/index.css'
import '../styles/account.css'
import '../styles/account/history.css'
import '../styles/cart.css'
import { AppProps } from 'next/app'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
