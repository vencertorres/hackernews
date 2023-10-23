import { User } from "@/lib/types";
import { format, fromUnixTime } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/user/${id}.json`,
  );
  const user = await res.json();

  if (!user) {
    notFound();
  }

  return {
    title: `Profile: ${user.id}`,
  };
}

async function getUser(id: string): Promise<User> {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/user/${id}.json`,
  );
  return await res.json();
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1 className="sr-only">Hacker News</h1>
      <h2 className="text-2xl font-medium text-orange-400">{user.id}</h2>
      <div className="space-y-2 text-sm">
        <p>Created: {format(fromUnixTime(user.created), "MMMM d, yyyy")}</p>
        <p>Karma: {user.karma}</p>
        {user.about && (
          <div
            className="space-y-2 break-words"
            dangerouslySetInnerHTML={{ __html: user.about }}
          />
        )}

        <a
          className="inline-block text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
          href={`https://news.ycombinator.com/submitted?id=${user.id}`}
        >
          submissions
        </a>
        {" | "}
        <a
          className="inline-block text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
          href={`https://news.ycombinator.com/threads?id=${user.id}`}
        >
          comments
        </a>
        {" | "}
        <a
          className="inline-block text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
          href={`https://news.ycombinator.com/favorites?id=${user.id}`}
        >
          favorites
        </a>
      </div>
    </div>
  );
}
