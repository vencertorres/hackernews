import CommentItem from "@/components/CommentItem";
import { Comment, Story } from "@/lib/types";
import { getDomain, pluralize } from "@/lib/utils";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  );
  const story = await res.json();

  if (!story) {
    notFound();
  }

  return {
    title: story.title,
  };
}

async function getComments(commentIDs: number[]): Promise<Comment[]> {
  return await Promise.all(
    commentIDs.map(async (id: number) => {
      const res = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      );
      const comment = await res.json();

      return {
        ...comment,
        time_ago:
          formatDistanceToNowStrict(fromUnixTime(comment.time)) + " ago",
        replies: await getComments(comment.kids || []),
      };
    }),
  );
}

async function getStory(
  id: string,
): Promise<{ story: Story; comments: Comment[] }> {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  );
  const story = await res.json();
  story.time_ago = formatDistanceToNowStrict(fromUnixTime(story.time)) + " ago";
  story.domain = getDomain(story.url);

  return {
    story,
    comments: await getComments(story.kids),
  };
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { story, comments } = await getStory(id);

  if (!story) {
    notFound();
  }

  return (
    <div>
      <article key={story.id}>
        {story.url ? (
          <h1>
            <a
              className="font-medium visited:text-neutral-500 hover:text-neutral-500"
              href={story.url}
            >
              {story.title}
            </a>{" "}
            <span className="text-sm text-neutral-500">({story.domain})</span>
          </h1>
        ) : (
          <h1>
            <Link
              className="font-medium visited:text-neutral-500 hover:text-neutral-500"
              href={`/item/${story.id}`}
            >
              {story.title}
            </Link>
          </h1>
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

      {story.text && (
        <div
          className="mt-2 space-y-2 break-words text-sm [&_*]:whitespace-pre-wrap [&_a:hover]:text-neutral-400 [&_a]:underline [&_a]:underline-offset-2"
          dangerouslySetInnerHTML={{ __html: story.text }}
        />
      )}

      <hr className="my-4" />

      {comments.length > 0 && (
        <section>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </section>
      )}
    </div>
  );
}
