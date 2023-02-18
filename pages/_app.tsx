import Layout from '@/components/layout'
import '@/styles/globals.css'
import { Inter } from '@next/font/google'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className={inter.className + ' mx-auto max-w-[50rem]'}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  )
}
