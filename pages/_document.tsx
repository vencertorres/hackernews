import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="text-neutral-800 dark:bg-neutral-800 dark:text-neutral-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
