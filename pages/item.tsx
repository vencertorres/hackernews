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
    <article>
      <Head>
        <title>{title}</title>
      </Head>

      <header>
        <h2>
          {story.url ? (
            <>
              <a
                className="font-medium visited:text-neutral-400 hover:text-neutral-400"
                href={story.url}
              >
                {story.title}
              </a>{' '}
              <span className="text-sm text-neutral-400">({story.host})</span>
            </>
          ) : (
            <Link
              className="font-medium visited:text-neutral-400 hover:text-neutral-400"
              href={`/item/${story.id}`}
            >
              {story.title}
            </Link>
          )}
        </h2>

        <p className="text-sm text-neutral-400">
          {story.type === 'job' ? (
            <>{story.time}</>
          ) : (
            <>
              {story.score} point{story.score === 1 ? '' : 's'} by{' '}
              <Link
                className="underline underline-offset-2 hover:text-neutral-800 dark:hover:text-neutral-50"
                href={`/user?id=${story.by}`}
              >
                {story.by}
              </Link>{' '}
              {story.time}
              {' · '}
              <Link
                className="underline underline-offset-2 hover:text-neutral-800 dark:hover:text-neutral-50"
                href={`/item?id=${story.id}`}
              >
                {story.descendants} comment{story.descendants === 1 ? '' : 's'}
              </Link>
            </>
          )}
        </p>
      </header>

      {story.text && (
        <p
          className="space-y-2 break-words text-sm data-[hidden=true]:hidden [&_a:hover]:text-neutral-400 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: story.text }}
        />
      )}

      <hr className="my-4" />

      <section>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </section>
    </article>
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
