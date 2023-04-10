import Mayout from '@/components/Mayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
        <Mayout>
          <Component {...pageProps} />
        </Mayout>)
}

export default MyApp
