import Comment from '@/components/comment'
import StoryHeader from '@/components/story-header'
import Text from '@/components/ui/text'
import { fetchComments } from '@/lib/fetch-comments'
import { fetchItem } from '@/lib/fetch-item'
import type { Story } from '@/lib/types'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'

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

      <StoryHeader story={story} />

      {story.text && <Text content={story.text} />}

      <hr className="my-4" />

      {comments.length > 0 && (
        <section>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </section>
      )}
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
