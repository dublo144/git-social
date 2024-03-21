import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Session } from "@supabase/supabase-js";
import { PostDetails } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserDataFromSession(session: Session) {
  const userId = session.user.id;
  const avatarUrl = session.user.user_metadata.avatar_url;
  const username = session.user.user_metadata.user_name;

  return { userId, avatarUrl, username };
}

export const combinedPostLikes = (
  data: PostDetails[] | null,
  sessionUserId: string
) =>
  data?.map((post) => ({
    ...post,
    isLikedByUser: !!post.likes.find((like) => like.user_id === sessionUserId),
    likes: post.likes.length,
    comments: post.comments.length,
    author: post.author!,
  })) ?? [];
