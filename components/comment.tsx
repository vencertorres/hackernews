import type { Comment } from '@/lib/types'
import Link from 'next/link'
import { useState } from 'react'

export default function Comment({ comment }: { comment: Comment }) {
  const [hidden, setHidden] = useState(false)

  function collapseComment() {
    setHidden(!hidden)
  }

  if (comment.dead || comment.deleted) return null

  return (
    <div>
      <div className="my-4">
        <small className="text-slate-500">
          <Link
            className="underline hover:text-slate-900"
            href={`/user?id=${comment.by}`}
          >
            {comment.by}
          </Link>{' '}
          ·{''} {comment.time}{' '}
          <button onClick={collapseComment} type="button">
            {hidden ? `[${(comment.kids?.length ?? 0) + 1} more]` : '[–]'}
          </button>
        </small>

        <p
          className="break-words text-sm data-[hidden=true]:hidden [&_*]:whitespace-pre-wrap [&_a:hover]:text-slate-500 [&_a]:underline"
          data-hidden={hidden}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      </div>

      {comment.replies.length > 0 && (
        <ul className="pl-4 data-[hidden=true]:hidden" data-hidden={hidden}>
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <Comment comment={reply} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
