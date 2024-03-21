import { Database } from "database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getPosts({
  dbClient,
  page,
  searchQuery,
  limit = 10,
}: {
  dbClient: SupabaseClient<Database>;
  page: number;
  searchQuery: string | null;
  limit?: number;
}) {
  let postQuery = dbClient
    .from("posts")
    .select("*, author: profiles(*), likes(user_id), comments(*)", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page);

  // If searchQuery is present, add the ILike to the DB-query.
  if (searchQuery) {
    postQuery = postQuery.ilike("title", `%${searchQuery}%`);
  }

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
