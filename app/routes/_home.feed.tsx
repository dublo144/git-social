import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import InfiniteFeedList from "~/components/feed/InfiniteFeedList";
import NewPost from "~/components/feed/NewPost";
import PostSearch from "~/components/feed/PostSearch";
import { getPosts } from "~/lib/database.server";
import { getSupabaseWithSessionAndHeaders } from "~/lib/supabase.server";
import { combinedPostLikes, getUserDataFromSession } from "~/lib/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get the current session
  const { headers, supabase, serverSession } =
    await getSupabaseWithSessionAndHeaders({
      request,
    });

  // Check if authenticated
  if (!serverSession) {
    return redirect("/login", { headers });
  }

  const sessionUserData = getUserDataFromSession(serverSession);

  // Get URL-params
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page")) || 1;

  // Fetch post data from DB
  const { data, totalPages } = await getPosts({
    dbClient: supabase,
    page: isNaN(page) ? 1 : page,
    searchQuery: query,
  });

  const posts = combinedPostLikes(data, sessionUserData.userId);

  return json({ posts, totalPages, query, data }, { headers });
};

export default function Posts() {
  const { posts, totalPages, query } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const isSearching = Boolean(
    navigation.location &&
      new URLSearchParams(navigation.location.search).has("query")
  );

  return (
    <div className="flex-col w-full">
      <PostSearch isSearching={isSearching} searchQuery={query || ""} />
      <NewPost />
      <InfiniteFeedList currentPosts={posts} totalPages={totalPages} />
    </div>
  );
}
