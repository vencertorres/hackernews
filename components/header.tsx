import { lists } from '@/lib/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeSwitch from './theme-switch'

export default function Navigation() {
  const { asPath } = useRouter()

  return (
    <header className="flex items-center space-x-4 p-4">
      <h1 className="mr-auto space-x-2 font-semibold">
        <span className="bg-orange-400 p-1 text-neutral-50">HN</span>
        <span className="hidden text-lg sm:inline">Hacker News</span>
      </h1>

      <nav className="space-x-4">
        {Object.keys(lists).map((list) => (
          <Link
            className="inline-block capitalize underline underline-offset-2 hover:text-neutral-400 aria-[current=page]:font-medium aria-[current=page]:text-orange-400 aria-[current=page]:no-underline"
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
