import type { Story } from '@/lib/types'
import Link from 'next/link'

export default function ListItem({ story }: { story: Story }) {
  return (
    <article>
      <h2>
        {story.url ? (
          <>
            <a
              className="font-medium underline-offset-2 visited:text-gray-500 hover:text-gray-500"
              href={story.url}
            >
              {story.title}
            </a>{' '}
            <span className="text-sm text-gray-500">({story.host})</span>
          </>
        ) : (
          <Link
            className="font-medium underline-offset-2 visited:text-gray-500 hover:text-gray-500"
            href={`/item?id=${story.id}`}
          >
            {story.title}
          </Link>
        )}
      </h2>

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
            <Link
              className="underline underline-offset-2 hover:text-gray-900"
              href={`/item?id=${story.id}`}
            >
              {story.descendants} comment{story.descendants === 1 ? '' : 's'}
            </Link>
          </>
        )}
      </p>
    </article>
  )
}
