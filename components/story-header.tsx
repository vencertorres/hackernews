import type { Story } from '@/lib/types'
import NextLink from 'next/link'
import Link from './ui/link'
import Small from './ui/small'

export default function StoryHeader({ story }: { story: Story }) {
  return (
    <header>
      <h2>
        {story.url ? (
          <>
            <Link href={story.url} medium>
              {story.title}
            </Link>{' '}
            <Small>({story.host})</Small>
          </>
        ) : (
          <NextLink href={`/item?id=${story.id}`} passHref legacyBehavior>
            <Link medium>{story.title}</Link>
          </NextLink>
        )}
      </h2>

      <Small>
        {story.type === 'job' ? (
          <>{story.time}</>
        ) : (
          <>
            {story.score} point{story.score === 1 ? '' : 's'} by{' '}
            <NextLink href={`/user?id=${story.by}`} passHref legacyBehavior>
              <Link>{story.by}</Link>
            </NextLink>{' '}
            {story.time}
            {' · '}
            <NextLink href={`/item?id=${story.id}`} passHref legacyBehavior>
              <Link>
                {story.descendants} comment{story.descendants === 1 ? '' : 's'}
              </Link>
            </NextLink>
          </>
        )}
      </Small>
    </header>
  )
}
