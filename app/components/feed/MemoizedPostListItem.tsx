import { memo } from "react";
import { SinglePostWithAuthorAndLikes } from "~/lib/types";
import Post from "./Post";
import LikeCounter from "./LikeCounter";
import Comments from "./Comments";
import dayjs from "dayjs";

type Props = { post: SinglePostWithAuthorAndLikes };

function PostListItem({ post }: Props) {
  return (
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
      <Comments commentCount={post.comments} pathname="123123" />
    </Post>
  );
}

const MemoizedPostListItem = memo(PostListItem);
MemoizedPostListItem.displayName = "MemoizedPostListItem";
export default MemoizedPostListItem;
