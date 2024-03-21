import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { CombinedPostsWithAuthorAndLikes } from "~/lib/types";
import type { loader as postLoader } from "~/routes/_home.posts";

type UseInfinitePosts = {
  totalPages: number;
  currentPosts: CombinedPostsWithAuthorAndLikes;
};

export const useInfintePosts = ({
  totalPages,
  currentPosts,
}: UseInfinitePosts) => {
  const [posts, setPosts] =
    useState<CombinedPostsWithAuthorAndLikes>(currentPosts);
  const fetcher = useFetcher<typeof postLoader>();
  const [currentPage, setCurrentPage] = useState(1);

  const hasMore = currentPage < totalPages;

  const loadMore = () => {
    if (hasMore && fetcher.state === "idle") {
      fetcher.load(`/posts?page${currentPage + 1}`);
    }
  };

  useEffect(() => {
    if (fetcher.data?.posts) {
      setPosts((prevPosts) => [...prevPosts, ...(fetcher.data?.posts || [])]);
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }, [fetcher.data]);

  return { posts, loadMore, hasMore };
};
