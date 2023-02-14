import { lists } from '@/lib/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation() {
  const router = useRouter()

  return (
    <nav className="space-x-4 p-4">
      {Object.keys(lists).map((list) => (
        <Link
          className="inline-block capitalize underline hover:text-slate-500 data-[active=true]:font-medium data-[active=true]:text-orange-500 data-[active=true]:no-underline"
          data-active={router.query.list === list}
          key={list}
          href={`/${list}?p=1`}
        >
          {list}
        </Link>
      ))}
    </nav>
  )
}
