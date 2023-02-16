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

      <div>
        <h1>
          {story.url ? (
            <>
              <a
                className="font-medium underline-offset-2 visited:text-gray-500 hover:text-gray-500"
                href={story.url}
              >
                {story.title}
              </a>{' '}
              <p className="text-sm text-gray-500">({story.host})</p>
            </>
          ) : (
            <Link
              className="font-medium underline-offset-2 visited:text-gray-500 hover:text-gray-500"
              href={`/item/${story.id}`}
            >
              {story.title}
            </Link>
          )}
        </h1>

        <p className="text-sm text-gray-500">
          {story.type === 'job' ? (
            <>{story.time}</>
          ) : (
            <>
              {story.score} point{story.score === 1 ? '' : 's'} by{' '}
              <Link
                className="underline underline-offset-2 hover:text-gray-900"
                href={`/user?id=${story.by}`}
              >
                {story.by}
              </Link>{' '}
              {story.time}
              {' · '}
              {story.descendants} comment{story.descendants === 1 ? '' : 's'}
            </>
          )}
        </p>

        {story.text && (
          <p
            className="space-y-2 break-words text-sm data-[hidden=true]:hidden [&_a:hover]:text-gray-500 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: story.text }}
          />
        )}

        <hr className="my-4" />

        <section>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </section>
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
