import { lists } from '@/lib/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation() {
  const router = useRouter()

  return (
    <nav className="flex items-center gap-4 p-4">
      <span className="mr-auto bg-orange-400 p-1 text-neutral-50">HN</span>
      {Object.keys(lists).map((list) => (
        <Link
          className="inline-block capitalize underline hover:text-slate-500 data-[active=true]:font-medium data-[active=true]:text-orange-400 data-[active=true]:no-underline"
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
