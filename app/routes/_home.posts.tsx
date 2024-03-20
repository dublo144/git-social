import { TabsContent } from "@radix-ui/react-tabs";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import Comments from "~/components/Comments";
import LikeCounter from "~/components/LikeCounter";
import Post from "~/components/Post";
import PostSearch from "~/components/PostSearch";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  return json({ query });
};

export default function Posts() {
  const { query } = useLoaderData<typeof loader>();
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
          <Post
            author={{
              avatarUrl: "https://i.pravatar.cc/40",
              id: "123",
              name: "John",
              username: "JohnJohn",
            }}
            dateTimeString="1231231"
            title="# title"
          >
            <LikeCounter likes={4} likedByUser={false} pathname="1234" />
            <Comments pathname="123" commentCount={3} readonly={false} />
          </Post>
        </TabsContent>
        <TabsContent value="my-posts"></TabsContent>
      </Tabs>
    </div>
  );
}
