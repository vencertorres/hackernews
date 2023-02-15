import Comment from '@/components/comment'
import { fetchComments } from '@/lib/fetch-comments'
import { fetchItem } from '@/lib/fetch-item'
import type { Story } from '@/lib/types'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import Link from 'next/link'

export default function ItemPage({
  story,
  comments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const title = `${story.title} · Hacker News`

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="p-4">
        <h1>
          {story.url ? (
            <>
              <a
                className="font-medium visited:text-slate-500 hover:text-slate-500"
                href={story.url}
              >
                {story.title}
              </a>{' '}
              <small className="text-slate-500">({story.host})</small>
            </>
          ) : (
            <Link
              className="font-medium visited:text-slate-500 hover:text-slate-500"
              href={`/item/${story.id}`}
            >
              {story.title}
            </Link>
          )}
        </h1>

        <small className="text-slate-500">
          {story.type === 'job' ? (
            <>{story.time}</>
          ) : (
            <>
              {story.score} point{story.score === 1 ? '' : 's'} by{' '}
              <Link
                className="underline hover:text-slate-900"
                href={`/user?id=${story.by}`}
              >
                {story.by}
              </Link>{' '}
              {story.time}
            </>
          )}
        </small>

        {story.text && (
          <p
            className="break-words text-sm data-[hidden=true]:hidden [&_a:hover]:text-slate-500 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: story.text }}
          />
        )}

        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = +context.query.id!

  try {
    const story: Story = await fetchItem(id)
    const comments = await fetchComments(story.kids || [])

    return {
      props: {
        story,
        comments,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}
