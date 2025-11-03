import { Link } from "wouter";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";
import Comment from "./Comment";
import styles from "./Item.module.css";

interface Item {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  type: string;
  content: string;
  url: string;
  domain?: string;
  comments_count: number;
  comments: Comment[];
}

export default function Item({ id }: { id: string }) {
  const { data: item, error } = useFetch<Item>(`/item/${id}`);

  if (error) return <Error />;
  if (!item) return <Spinner />;

  return (
    <article>
      <title>{`${item.title} | Hacker News`}</title>

      <div className={styles.item}>
        <header>
          <h1 className={styles.heading}>
            {item.domain ? (
              <a href={item.url} className="">
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </h1>
          {item.domain && <span className={styles.domain}>{item.domain}</span>}
          {item.type === "job" ? (
            <p className={styles.meta}>{item.time_ago}</p>
          ) : (
            <p className={styles.meta}>
              {item.points} {item.points === 1 ? "point " : "points "}
              by <Link href={`/user/${item.user}`}>{item.user}</Link>{" "}
              {item.time_ago}
            </p>
          )}
        </header>

        {item.content && (
          <div
            dangerouslySetInnerHTML={{ __html: item.content }}
            className={styles.content}
          />
        )}
      </div>

      {item.comments_count > 0 && (
        <section className={styles.comments}>
          {item.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </section>
      )}
    </article>
  );
}
