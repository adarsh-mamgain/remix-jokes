import { json, Link, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const joke = await db.Joke.findUnique({
    where: { id: params.jokeId },
  });
  if (!joke) throw new Error("Joke not found");
  const data = { joke };
  return json(data);
};

export default function JokeRoute() {
  const data = useLoaderData();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}
