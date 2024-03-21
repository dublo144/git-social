import { Virtuoso } from "react-virtuoso";
import { useInfintePosts } from "~/hooks/useInfinitePosts";
import { CombinedPostsWithAuthorAndLikes } from "~/lib/types";
import MemoizedPostListItem from "./MemoizedPostListItem";
import { PostSkeleton } from "./Post";

type Props = {
  totalPages: number;
  currentPosts: CombinedPostsWithAuthorAndLikes;
};

export default function InfinitePostList({ totalPages, currentPosts }: Props) {
  const { posts, loadMore, hasMore } = useInfintePosts({
    totalPages,
    currentPosts,
  });

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
