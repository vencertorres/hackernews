import ListItem from '@/components/list-item'
import { getStories } from '@/lib/get-stories'
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

      <div className="space-y-4 p-4">
        {stories.map((story) => (
          <ListItem key={story.id} story={story} />
        ))}
        <Link
          className="mt-4 inline-block underline hover:text-slate-500"
          href={`/${list}?p=${page + 1}`}
        >
          More
        </Link>
      </div>
    </>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const list = context.query.list as string
  const page = +context.query.p! as number

  const stories: Story[] | undefined = await getStories(list, page)

  if (!stories) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      list,
      page,
      stories,
    },
  }
}