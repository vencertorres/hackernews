"use client";

import { Comment } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

export default function CommentItem({ comment }: { comment: Comment }) {
  const [show, setShow] = useState(true);

  if (comment.dead || comment.deleted) {
    return null;
  }

  return (
    <div className="my-4">
      <p className="text-sm text-neutral-500">
        <Link
          className="font-medium visited:text-neutral-500 hover:text-neutral-500"
          href={`/user/${comment.by}`}
        >
          {comment.by}
        </Link>{" "}
        {comment.time_ago}{" "}
        <button className="hover:text-slate-800" onClick={() => setShow(!show)}>
          {show ? "[-]" : `[${comment.replies.length} more]`}
        </button>
      </p>

      {show && (
        <>
          <div
            className="space-y-2 break-words text-sm [&_*]:whitespace-pre-wrap [&_a:hover]:text-neutral-400 [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />

          {comment.replies.length > 0 && (
            <ul className="pl-4">
              {comment.replies.map((reply) => (
                <li key={reply.id}>
                  <CommentItem comment={reply} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
