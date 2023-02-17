import Link from '@/components/ui/link'
import { fetchUser } from '@/lib/fetch-user'
import type { User } from '@/lib/types'
import type { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

export default function UserPage({ user }: { user: User }) {
  const title = `Profile: ${user.id} · Hacker News`
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <h2 className="text-2xl font-medium text-orange-400">{user.id}</h2>
      <div className="space-y-2 text-sm">
        <p>Created: {user.created}</p>
        <p>Karma: {user.karma}</p>
        {user.about && (
          <div
            className="space-y-2 break-words"
            dangerouslySetInnerHTML={{ __html: user.about }}
          />
        )}

        <Link href={`https://news.ycombinator.com/submitted?id=${user.id}`}>
          submissions
        </Link>
        {' · '}
        <Link href={`https://news.ycombinator.com/threads?id=${user.id}`}>
          comments
        </Link>
        {' · '}
        <Link href={`https://news.ycombinator.com/favorites?id=${user.id}`}>
          favorites
        </Link>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id as string

  try {
    const user: User = await fetchUser(id)

    return {
      props: {
        user,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
