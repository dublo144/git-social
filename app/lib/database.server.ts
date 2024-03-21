import { Database } from "database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getPosts({
  dbClient,
  page,
  limit = 10,
}: {
  dbClient: SupabaseClient<Database>;
  page: number;
  limit?: number;
}) {
  const postQuery = dbClient
    .from("posts")
    .select("*, author: profiles(*), likes(user_id), comments(*)", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page);
  const { data, error, count } = await postQuery;

  if (error) {
    console.log("Error at GetPosts ", error);
  }

  return {
    data,
    error,
    totalPosts: count,
    limit,
    totalPages: count ? Math.ceil(count / limit) : 1,
  };
}
