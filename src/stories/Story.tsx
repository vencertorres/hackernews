import { Link } from "wouter";
import styles from "./Story.module.css";

interface Story {
  id: number;
  title: string;
  points?: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain?: string;
}

function Story({ story, index }: { story: Story; index: number }) {
  return (
    <article className={styles.story}>
      <h1 className={styles.heading}>
        {story.domain ? (
          <>
            <a href={story.url}>{story.title}</a>{" "}
            <span className={styles.domain}>({story.domain})</span>
          </>
        ) : (
          <Link href={`/item/${story.id}`}>{story.title}</Link>
        )}
      </h1>

      {story.type === "job" ? (
        <p className={styles.meta}>{story.time_ago}</p>
      ) : (
        <p className={styles.meta}>
          {story.points} {story.points === 1 ? "point " : "points "}
          by <Link href={`/user/${story.user}`}>{story.user}</Link>{" "}
          {story.time_ago} |{" "}
          <Link href={`/item/${story.id}`}>
            {story.comments_count}{" "}
            {story.comments_count === 1 ? "comment" : "comments"}
          </Link>
        </p>
      )}

      <span className={styles.index}>{index}</span>
    </article>
  );
}

export default Story;
