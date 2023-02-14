import { getUser } from '@/lib/get-user'
import type { User } from '@/lib/types'
import type { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

export default function UserPage({ user }: { user: User }) {
  const title = `Profile: ${user.id} · Hacker News`

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="p-4">
        <h1 className="text-2xl font-medium text-orange-500">{user.id}</h1>
        <div className="space-y-2 text-sm">
          <div className="flex gap-4">
            <span className="text-slate-500">Joined:</span>
            <span>{user.created}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-slate-500">Karma:</span>
            <span>{user.karma}</span>
          </div>
          {user.about && (
            <div className="flex gap-4">
              <span className="text-slate-500">About:</span>
              <p
                className="break-words [&_p]:mt-4"
                dangerouslySetInnerHTML={{ __html: user.about }}
              />
            </div>
          )}
          <a
            className="block underline hover:text-slate-500"
            href={`https://news.ycombinator.com/submitted?id=${user.id}`}
          >
            Submissions
          </a>
          <a
            className="block underline hover:text-slate-500"
            href={`https://news.ycombinator.com/threads?id=${user.id}`}
          >
            Comments
          </a>
          <a
            className="block underline hover:text-slate-500"
            href={`https://news.ycombinator.com/favorites?id=${user.id}`}
          >
            Favorites
          </a>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query.id as string

  const user: User = await getUser(id)

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user,
    },
  }
}
