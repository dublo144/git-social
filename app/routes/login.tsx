import { Link, useOutletContext } from "@remix-run/react";

import AppLogo from "~/components/AppLogo";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Github } from "lucide-react";
import { SupabaseOutletContextType } from "~/lib/supabase";

export default function Login() {
  const { supabase, domainUrl } = useOutletContext<SupabaseOutletContextType>();

  const handleSignIn = async () =>
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${domainUrl}/resources/auth/callback`,
      },
    });

  return (
    <section className="flex flex-col w-full min-h-screen bg-white">
      <nav className="flex items-center px-4 space-x-2">
        <Link to={"/"} className="flex items-center">
          <AppLogo className="w-10 md:w-20" />
          <h1 className="text-xl font-semibold text-zinc-900">LikeHuntr</h1>
        </Link>
      </nav>
      <div className="container flex-col items-center justify-center px-4 md:flex md:px-6">
        <div className="flex flex-col items-center p-4 space-y-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tighter md:text-5xl">
            Login using <br />
            Github
          </h1>
        </div>
        <Card className="relative overflow-hidden rounded-lg group">
          <CardContent className="p-1 bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 bg-300% animate-gradient">
            <Button onClick={() => handleSignIn()}>
              <Github className="w-6 h-6 mr-2" />
              <span className="font-extrabold">Github</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
