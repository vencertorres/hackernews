import { useState } from "react";
import { Link } from "wouter";
import styles from "./Comment.module.css";

interface Comment {
  id: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
  dead?: boolean;
  deleted?: boolean;
  comments_count: number;
  comments: Comment[];
}

function Comment({ comment }: { comment: Comment }) {
  const [isExpanded, setIsExpanded] = useState(true);

  function toggle() {
    setIsExpanded(!isExpanded);
  }

  if (comment.dead || comment.dead) {
    return null;
  }

  return (
    <article>
      <footer className={styles.meta}>
        <Link href={`/user/${comment.user}`}>{comment.user}</Link>{" "}
        {comment.time_ago}{" "}
        <button type="button" onClick={toggle} className={styles.button}>
          [{isExpanded ? "-" : comment.comments_count + " more"}]
        </button>
      </footer>

      {isExpanded && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
          <div className={styles.comments}>
            {comment.comments_count > 0 && (
              <div>
                {comment.comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default Comment;
