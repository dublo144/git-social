import { TabsContent } from "@radix-ui/react-tabs";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import InfinitePostList from "~/components/InfinitePostList";
import PostSearch from "~/components/PostSearch";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
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
    <div className="flex-col w-full max-w-xl px-4">
      <Tabs defaultValue="feed" className="my-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feed">My Feed</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <Separator className="my-4" />
          <PostSearch isSearching={isSearching} searchQuery={query || ""} />
          <InfinitePostList currentPosts={posts} totalPages={totalPages} />
        </TabsContent>
        <TabsContent value="my-posts"></TabsContent>
      </Tabs>
    </div>
  );
}
