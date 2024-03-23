import { BellDotIcon, Menu, X } from "lucide-react";
import AppLogo from "../AppLogo";
import { useState } from "react";
import { Link } from "@remix-run/react";
import { Button } from "../ui/button";

export default function Header() {
  // TODO: Hardcoded
  const username = "madsbrandt";
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between w-full h-16 px-6 bg-white border-b border-gray-200 md:flex-none">
      <Link to={"/"} className="flex items-center space-x-2">
        <AppLogo className="w-10 md:w-20" />
        <h1 className="text-xl font-semibold text-zinc-900">LikeHuntr</h1>
      </Link>
      <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden">
        {isNavOpen ? <X /> : <Menu />}
      </button>
      <div
        className={`flex md:flex-row items-center md:space-y-0 md:space-x-2 ${
          isNavOpen ? "flex-col order-last w-full md:w-auto" : "hidden md:flex"
        }`}
      >
        <Button variant={"ghost"} className="space-x-2 text-indigo-500">
          <BellDotIcon />
          <span>Notifications</span>
        </Button>
        <Link
          prefetch="intent"
          to={`/profile/${username}`}
          className="text-indigo-500"
        >
          <img
            alt="Profile"
            className="rounded-full "
            width={40}
            height={40}
            src="https://i.pravatar.cc/40"
            style={{ aspectRatio: "40/40", objectFit: "cover" }}
          />
        </Link>
      </div>
    </header>
  );
}
