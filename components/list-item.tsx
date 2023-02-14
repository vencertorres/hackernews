import type { Story } from '@/lib/types'
import Link from 'next/link'

export default function ListItem({ story }: { story: Story }) {
  return (
    <article>
      <h2>
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
      </h2>

      <small className="text-slate-500">
        {story.type === 'job' ? (
          <>{story.time}</>
        ) : (
          <>
            {story.score} point{story.score === 1 ? '' : 's'} by{' '}
            <Link
              className="underline hover:text-slate-900"
              href={`/user/${story.by}`}
            >
              {story.by}
            </Link>{' '}
            {story.time} ·{' '}
            <Link
              className="underline hover:text-slate-900"
              href={`/item/${story.id}`}
            >
              {story.descendants} comment{story.descendants === 1 ? '' : 's'}
            </Link>
          </>
        )}
      </small>
    </article>
  )
}
