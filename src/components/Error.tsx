import { Link } from "wouter";

export default function Error() {
  return (
    <>
      <title>404 | Hacker News</title>

      <h1>404</h1>

      <p>Not Found</p>

      <Link href="/top/1">&lt;&lt; Go back home</Link>
    </>
  );
}
