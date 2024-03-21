import { Virtuoso } from "react-virtuoso";
import { useInfintePosts } from "~/hooks/useInfinitePosts";
import { CombinedPostsWithAuthorAndLikes } from "~/lib/types";
import MemoizedPostListItem from "./MemoizedPostListItem";
import { PostSkeleton } from "./Post";
import AppLogo from "./AppLogo";

type Props = {
  totalPages: number;
  currentPosts: CombinedPostsWithAuthorAndLikes;
};

export default function InfinitePostList({ totalPages, currentPosts }: Props) {
  const { posts, loadMore, hasMore } = useInfintePosts({
    totalPages,
    currentPosts,
  });

  if (!posts.length) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <AppLogo className="w-10 h-10" />
        <h2 className="ml-2">No posts found</h2>
      </div>
    );
  }

  return (
    <Virtuoso
      data={posts}
      useWindowScroll
      initialTopMostItemIndex={0}
      endReached={loadMore}
      initialItemCount={5}
      overscan={500}
      itemContent={(_, post) => {
        if (!post) return <div></div>;
        return <MemoizedPostListItem post={post} />;
      }}
      components={{
        Footer: () => {
          if (!hasMore) {
            return null;
          }
          return <PostSkeleton />;
        },
      }}
    />
  );
}
