import { lists } from '@/lib/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation() {
  const { asPath } = useRouter()

  return (
    <nav className="flex items-center gap-4 p-4">
      <span className="mr-auto bg-orange-400 p-1 text-neutral-50">HN</span>
      {Object.keys(lists).map((list) => (
        <Link
          className="inline-block capitalize underline underline-offset-2 hover:text-gray-500 aria-[current=page]:font-medium aria-[current=page]:text-orange-400 aria-[current=page]:no-underline"
          aria-current={asPath === `/${list}?p=1` ? 'page' : undefined}
          key={list}
          href={`/${list}?p=1`}
        >
          {list}
        </Link>
      ))}
    </nav>
  )
}
