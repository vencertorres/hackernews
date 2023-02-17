import type { Comment } from '@/lib/types'
import NextLink from 'next/link'
import { useState } from 'react'
import Link from './ui/link'
import Paragraph from './ui/paragraph'
import Small from './ui/small'

export default function Comment({ comment }: { comment: Comment }) {
  const [expanded, setExpanded] = useState(true)

  if (comment.dead || comment.deleted) return null

  return (
    <div className="my-4">
      <Small>
        <NextLink href={`/user?id=${comment.by}`} passHref legacyBehavior>
          <Link>{comment.by}</Link>
        </NextLink>
        {' · '}
        {comment.time}{' '}
        <button
          className="hover:text-slate-800 dark:hover:text-slate-50"
          onClick={() => setExpanded(!expanded)}
          type="button"
        >
          {expanded ? '[–]' : `[${(comment.kids?.length ?? 0) + 1} more]`}
        </button>
      </Small>

      {expanded && (
        <>
          <Paragraph content={comment.text} />

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
