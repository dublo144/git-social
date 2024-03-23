import {
  Layers,
  MessagesSquare,
  Settings,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { NavItem } from "~/types";

export const NavItems: NavItem[] = [
  {
    title: "Feed",
    icon: Layers,
    href: "/feed",
  },
  {
    title: "Messages",
    icon: MessagesSquare,
    href: "/chat",
  },
  {
    title: "Trending",
    icon: TrendingUp,
    href: "/trending",
  },
  {
    title: "Discover",
    icon: Sparkles,
    href: "/discover",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    sepparated: true,
  },
];
