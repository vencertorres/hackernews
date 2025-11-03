import Error from "../components/Error";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";
import styles from "./User.module.css";

interface User {
  id: string;
  karma: number;
  created_time: number;
  created: string;
  about: string;
}

export default function User({ username }: { username: string }) {
  const { data: user, error } = useFetch<User>(`/user/${username}`);

  if (error) return <Error />;
  if (!user) return <Spinner />;

  return (
    <main>
      <title>{`Profile: ${username} | Hacker News`}</title>
      <h1>{username}</h1>
      <p>created: {user.created}</p>
      <p>karma: {user.karma}</p>
      {user.about && (
        <div
          dangerouslySetInnerHTML={{ __html: user.about }}
          className={styles.about}
        />
      )}
      <a href={`https://news.ycombinator.com/submitted?id=${username}`}>
        submissions
      </a>{" "}
      |{" "}
      <a href={`https://news.ycombinator.com/threads?id=${username}`}>
        comments
      </a>{" "}
      |{" "}
      <a href={`https://news.ycombinator.com/favorites?id=${username}`}>
        favorites
      </a>
    </main>
  );
}
