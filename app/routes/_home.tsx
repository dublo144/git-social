import { Link, Outlet } from "@remix-run/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import AppLogo from "~/components/AppLogo";
import { Button } from "~/components/ui/button";

export default function Home() {
  const username = "madsbrandt";

  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <section className="flex flex-col w-full min-h-screen bg-white">
      <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between w-full px-6 border-b border-zinc-200 md:flex-none">
        <Link to={"/"} className="flex items-center space-x-2">
          <AppLogo className="w-10 md:w-20" />
          <h1 className="text-xl font-semibold text-zinc-900">LikeHuntr</h1>
        </Link>
        <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden">
          {isNavOpen ? <X /> : <Menu />}
        </button>
        <div
          className={`flex md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 ${
            isNavOpen
              ? "flex-col order-last w-full md:w-auto"
              : "hidden md:flex"
          }`}
        >
          <Link prefetch="intent" to={`/profile/${username}`}>
            @{username}
          </Link>
          <img
            alt="Profile"
            className="rounded-full"
            width={40}
            height={40}
            src="https://i.pravatar.cc/40"
            style={{ aspectRatio: "40/40", objectFit: "cover" }}
          />
          <Button>Logout</Button>
        </div>
      </nav>
      <Outlet />
    </section>
  );
}
