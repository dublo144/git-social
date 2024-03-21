import { TabsContent } from "@radix-ui/react-tabs";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import dayjs from "dayjs";
import Comments from "~/components/Comments";
import LikeCounter from "~/components/LikeCounter";
import Post from "~/components/Post";
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

  // Fetch post data from DB
  const { data } = await getPosts({ dbClient: supabase });

  const posts = combinedPostLikes(data, sessionUserData.userId);

  return json({ sessionUserData, posts, query, data }, { headers });
};

export default function Posts() {
  const { sessionUserData, posts, query } = useLoaderData<typeof loader>();
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
          {posts?.map((post) => (
            <Post
              key={post.id}
              author={{
                id: post.id,
                avatarUrl: post.author!.avatar_url,
                name: post.author!.name,
                username: post.author!.username,
              }}
              dateTimeString={dayjs(post.created_at).format("DD-MM-YYYY")}
              title={post.title}
            >
              <LikeCounter
                likes={post.likes}
                likedByUser={post.isLikedByUser}
                pathname={"1231231"}
              />
              <Comments
                commentCount={post.comments}
                pathname="123123"
                readonly={post.user_id !== sessionUserData.userId}
              />
            </Post>
          ))}
        </TabsContent>
        <TabsContent value="my-posts"></TabsContent>
      </Tabs>
    </div>
  );
}
