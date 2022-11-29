import dynamic from 'next/dynamic'
import '../styles/globals.css'
import '../assets/style/disc.css'

function MyApp({ Component, pageProps }) {

  const CartProvider = dynamic(
    () => import('../Context/Cart'),
    { ssr: false },
  )

  return (
    <CartProvider><Component {...pageProps} /></CartProvider>
  )
}

export default MyApp
