import { Database } from "database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getPosts({
  dbClient,
}: {
  dbClient: SupabaseClient<Database>;
}) {
  const postQuery = dbClient
    .from("posts")
    .select("*, author: profiles(*), likes(user_id), comments(*)")
    .order("created_at", { ascending: false });

  const { data, error } = await postQuery;

  if (error) {
    console.log("Error at GetPosts ", error);
  }

  return { data, error };
}
