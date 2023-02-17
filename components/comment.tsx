import type { Comment } from '@/lib/types'
import Link from 'next/link'
import { useState } from 'react'

export default function Comment({ comment }: { comment: Comment }) {
  const [expanded, setExpanded] = useState(true)

  if (comment.dead || comment.deleted) return null

  return (
    <div className="my-4">
      <p className="text-sm text-neutral-400">
        <Link
          className="underline underline-offset-2 hover:text-neutral-800 dark:hover:text-neutral-50"
          href={`/user?id=${comment.by}`}
        >
          {comment.by}
        </Link>
        {' · '}
        {comment.time}{' '}
        <button
          className="hover:text-slate-800 dark:hover:text-slate-50"
          onClick={() => setExpanded(!expanded)}
          type="button"
        >
          {expanded ? '[–]' : `[${(comment.kids?.length ?? 0) + 1} more]`}
        </button>
      </p>

      {expanded && (
        <>
          <p
            className="space-y-2 break-words text-sm [&_*]:whitespace-pre-wrap [&_a:hover]:text-neutral-400 dark:[&_a:hover]:text-neutral-400 [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
          {comment.replies.length > 0 && (
            <ul className="pl-4">
              {comment.replies.map((reply) => (
                <li key={reply.id}>
                  <Comment comment={reply} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
