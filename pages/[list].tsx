import ListItem from '@/components/list-item'
import { fetchStories } from '@/lib/fetch-stories'
import type { Story } from '@/lib/types'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import Link from 'next/link'

export default function List({
  list,
  page,
  stories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Hacker News</title>
      </Head>

      <div className="space-y-4">
        {stories.map((story) => (
          <ListItem key={story.id} story={story} />
        ))}
        <Link
          className="inline-block underline underline-offset-2 hover:text-neutral-400"
          href={`/${list}?p=${page + 1}`}
        >
          More
        </Link>
      </div>
    </>
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
