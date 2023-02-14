import Navigation from '@/components/navigation'
import '@/styles/globals.css'
import { Inter } from '@next/font/google'
import type { AppProps } from 'next/app'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Navigation />
      <Component {...pageProps} />
    </main>
  )
}
