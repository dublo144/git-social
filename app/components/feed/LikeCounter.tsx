import { Link } from "@remix-run/react";
import { Heart } from "lucide-react";

type Props = { likes: number; likedByUser: boolean; pathname: string };

export default function LikeCounter({ likes, likedByUser, pathname }: Props) {
  return (
    <Link to={pathname} className="flex items-center justify-center group">
      <Heart
        className={`w-4 h-4 text-gray-400 transition-transform duration-500 group-hover:fill-indigo-500 group-hover:text-indigo-500 group-hover:-translate-y-1 ${
          likedByUser && "fill-indigo-500"
        }`}
      />
      <span className="ml-2 text-sm">{likes}</span>
    </Link>
  );
}
