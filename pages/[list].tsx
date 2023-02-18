import StoryHeader from '@/components/story-header'
import Link from '@/components/ui/link'
import { fetchStories } from '@/lib/fetch-stories'
import type { Story } from '@/lib/types'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import NextLink from 'next/link'

export default function List({
  list,
  page,
  stories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <article key={story.id}>
          <StoryHeader story={story} />
        </article>
      ))}

      <NextLink href={`/${list}?p=${page + 1}`} passHref legacyBehavior>
        <Link>Next &raquo;</Link>
      </NextLink>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const list = context.query.list as string
  const page = +context.query.p! || 1

  try {
    const stories: Story[] = await fetchStories(list, page)

    return {
      props: {
        list,
        page,
        stories,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
