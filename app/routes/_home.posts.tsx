import { Separator } from "@radix-ui/react-separator";
import { TabsContent } from "@radix-ui/react-tabs";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import PostSearch from "~/components/PostSearch";
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
          <Separator />
          <PostSearch isSearching={isSearching} searchQuery={query || ""} />
          {/* <Post>
            <ViewLikes />
            <ViewComments />
          </Post> */}
        </TabsContent>
        <TabsContent value="my-posts"></TabsContent>
      </Tabs>
    </div>
  );
}
