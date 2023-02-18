import { lists } from '@/lib/constants'
import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeSwitch from './theme-switch'

export default function Navigation() {
  const { asPath } = useRouter()

  return (
    <header className="flex items-center space-x-4 p-4">
      <h1 className="mr-auto flex items-center space-x-2 font-semibold">
        <Image className="inline h-8 w-8" src={logo} alt="Hacker News logo" />
        <span className="hidden text-lg sm:inline">Hacker News</span>
      </h1>

      <nav className="space-x-4">
        {Object.keys(lists).map((list) => (
          <Link
            className="inline-block capitalize underline underline-offset-2 hover:text-neutral-400 aria-[current=page]:font-medium aria-[current=page]:text-neutral-500 aria-[current=page]:no-underline dark:aria-[current=page]:text-neutral-400"
            aria-current={asPath === `/${list}?p=1` ? 'page' : undefined}
            key={list}
            href={`/${list}?p=1`}
          >
            {list}
          </Link>
        ))}
      </nav>

      <ThemeSwitch />
    </header>
  )
}
