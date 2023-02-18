import Head from 'next/head'
import Header from './header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Hacker News</title>
        <meta
          name="description"
          content="A Hacker News clone built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="p-4">{children}</main>
    </>
  )
}
