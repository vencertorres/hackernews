import { Link } from "wouter";
import Error from "../components/Error";
import useFetch from "../hooks/use-fetch";
import Story from "./Story";
import Spinner from "../components/Spinner";

export default function Stories({
  stories,
  page,
}: {
  stories: string;
  page: string;
}) {
  const category =
    stories === "top" ? "news" : stories === "new" ? "newest" : stories;
  const { data, error } = useFetch<Story[]>(`/${category}/${page}`);

  if (error) return <Error />;
  if (!data) return <Spinner />;

  const start = 1 + (+page - 1) * 30;
  const nextPage = +page + 1;

  return (
    <>
      {data.map((story, index) => (
        <Story key={story.id} story={story} index={start + index} />
      ))}
      <Link href={`/${stories}/${nextPage}`}>Page {nextPage} &gt;&gt;</Link>
    </>
  );
}
