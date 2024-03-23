import { Link, useLocation, useOutletContext } from "@remix-run/react";
import { NavItems } from "../constants/side-nav";
import { ChevronLeft } from "lucide-react";
import { Separator } from "../ui/separator";
import { SupabaseOutletContextType } from "~/lib/supabase";
import { cn } from "~/lib/utils";
import { useState } from "react";

export default function Sidebar() {
  // TODO Animate sidebar collapse

  const [isOpen, setIsOpen] = useState(true);
  const { supabase } = useOutletContext<SupabaseOutletContextType>();
  const { pathname } = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      id="sidebar"
      className={cn(
        "h-screen transform transition-all duration-500",
        isOpen && "w-64"
      )}
    >
      <div className="flex flex-col bottom-0 h-[calc(100vh-4rem)] overflow-y-auto bg-white border-r border-indigo-200">
        <ChevronLeft
          className={cn(
            "absolute -right-3 top-5 cursor-pointer rounded-full border hover:border-indigo-500 border-indigo-200 bg-background text-3xl text-indigo-500",
            !isOpen && "rotate-180"
          )}
          onClick={handleToggle}
        />

        <nav className="mt-16 space-y-2 text-sm font-medium">
          {NavItems.map((item) => (
            <>
              {item.sepparated && <Separator className="my-2 bg-indigo-200" />}
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-indigo-500 rounded-lg hover:bg-indigo-400 group",
                  pathname === item.href && "bg-indigo-500"
                )}
              >
                <item.icon
                  className={cn(
                    "transform group-hover:text-white group-hover:-translate-y-1 duration-300",
                    pathname === item.href && "text-white"
                  )}
                />
                {isOpen && (
                  <span
                    className={cn(
                      "flex-1 ml-4 whitespace-nowrap group-hover:text-white",
                      pathname === item.href && "text-white"
                    )}
                  >
                    {item.title}
                  </span>
                )}
              </Link>
            </>
          ))}
        </nav>
      </div>
    </aside>
  );
}
