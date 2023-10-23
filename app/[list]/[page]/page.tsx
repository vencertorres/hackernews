import { Story } from "@/lib/types";
import { getDomain, pluralize } from "@/lib/utils";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import Link from "next/link";

async function getStories(params: {
  list: string;
  page: string;
}): Promise<Story[]> {
  const list = params.list === "jobs" ? "jobstories" : params.list + "stories";
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/${list}.json`);
  const storyIDs = await res.json();

  const start = (+params.page - 1) * 30;
  const end = start + 30;

  return await Promise.all(
    storyIDs.slice(start, end).map(async (id: number) => {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      );
      const story = await res.json();
      return {
        ...story,
        time_ago: formatDistanceToNowStrict(fromUnixTime(story.time)) + " ago",
        domain: getDomain(story.url),
      };
    }),
  );
}

export default async function Page({
  params,
}: {
  params: { list: string; page: string };
}) {
  const stories = await getStories(params);

  return (
    <div className="space-y-4">
      <h1 className="sr-only">Hacker News</h1>

      {stories.map((story) => (
        <article key={story.id}>
          {story.url ? (
            <h2>
              <a
                className="font-medium visited:text-neutral-500 hover:text-neutral-500"
                href={story.url}
              >
                {story.title}
              </a>{" "}
              <span className="text-sm text-neutral-500">({story.domain})</span>
            </h2>
          ) : (
            <h2>
              <Link
                className="font-medium visited:text-neutral-500 hover:text-neutral-500"
                href={`/item/${story.id}`}
              >
                {story.title}
              </Link>
            </h2>
          )}

          {story.type === "job" ? (
            <p className="text-sm text-neutral-500">{story.time}</p>
          ) : (
            <p className="text-sm text-neutral-500">
              {pluralize(story.score, "point")} by{" "}
              <Link
                className="inline-block text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
                href={`/user/${story.by}`}
              >
                {story.by}
              </Link>{" "}
              {story.time_ago}{" "}
              <Link
                className="inline-block text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
                href={`/item/${story.id}`}
              >
                {pluralize(story.descendants, "comment")}
              </Link>
            </p>
          )}
        </article>
      ))}

      <Link
        className="inline-block text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
        href={`/${params.list}/${+params.page + 1}`}
      >
        Next &raquo;
      </Link>
    </div>
  );
}
