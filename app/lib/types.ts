import { Database } from "~/types/database.types";
import { combinedPostLikes } from "./utils";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Comment = Database["public"]["Tables"]["comments"]["Row"];

type Like = {
  user_id: string;
};

export type PostDetails = Post & {
  author: Profile | null;
  likes: Like[];
  comments: Comment[];
};

export type CombinedPostsWithAuthorAndLikes = ReturnType<
  typeof combinedPostLikes
>;

export type SinglePostWithAuthorAndLikes =
  CombinedPostsWithAuthorAndLikes[number];
