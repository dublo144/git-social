import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, json, redirect } from "@remix-run/react";

import AppLogo from "~/components/AppLogo";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { getSupabaseWithSessionAndHeaders } from "~/lib/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
    request,
  });

  if (serverSession) {
    return redirect("/feed", { headers });
  }

  return json({ success: true }, { headers });
};

export default function Index() {
  return (
    <section className="flex flex-col w-full min-h-screen bg-white">
      <nav className="flex items-center px-4 space-x-2">
        <AppLogo className="w-10 md:w-20" />
        <h1 className="text-xl font-semibold text-zinc-900">LikeHuntr</h1>
      </nav>
      <div className="container items-center justify-center flex-1 px-4 md:flex md:px-6">
        <div className="flex flex-col items-center p-4 space-y-4 text-center md:w-1/2">
          <h1 className="text-3xl tracking-tighter md:text-5xl">
            A{" "}
            <span className="font-extrabold text-transparent bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 bg-clip-text bg-300% animate-gradient">
              MINIMALIST
              <br />
            </span>{" "}
            social platform for
            <br />
            <span className="font-extrabold text-transparent bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 bg-clip-text bg-300% animate-gradient">
              DEVELOPERS
            </span>
          </h1>

          <p className="mt-2 text-gray-500">
            Powered by{" "}
            <span className="mt-2 font-bold text-blue-700">Remix</span> and{" "}
            <span className="mt-2 font-bold text-green-700">Supabase</span>{" "}
          </p>

          <Button asChild>
            <Link to={"/login"}>Hunt likes now</Link>
          </Button>
        </div>
        <Card className="relative overflow-hidden rounded-lg group md:w-1/2">
          <CardContent className="p-1">
            <video className="w-full h-full rounded-lg" autoPlay loop muted>
              <source src="assets/videos/demo.mp4" type="video/mp4"></source>
            </video>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
