import { useFetcher, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { CombinedPostsWithAuthorAndLikes } from "~/lib/types";
import type { loader as postLoader } from "~/routes/_home.feed";

type UseInfinitePosts = {
  totalPages: number;
  currentPosts: CombinedPostsWithAuthorAndLikes;
};

export const useInfintePosts = ({
  totalPages,
  currentPosts,
}: UseInfinitePosts) => {
  const [posts, setPosts] = useState(currentPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  const fetcher = useFetcher<typeof postLoader>();

  const hasMore = currentPage < totalPages;

  const [prevPosts, setPrevPosts] = useState(currentPosts);
  if (currentPosts !== prevPosts) {
    setPrevPosts(currentPosts);
    setPosts(currentPosts);
    setCurrentPage(1);
  }

  const loadMore = () => {
    // If the database has more and we are not already loading
    if (hasMore && fetcher.state === "idle") {
      let searchQueryParams = "";
      if (location.search) {
        // Keep the search params, when scrolling
        searchQueryParams = `${location.search}&page=${currentPage + 1}`;
      } else {
        searchQueryParams = `&page=${currentPage + 1}`;
      }

      fetcher.load(`${location.pathname}/${searchQueryParams}`);
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
