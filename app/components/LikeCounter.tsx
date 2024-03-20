import { Link } from "@remix-run/react";
import { Heart } from "lucide-react";

type Props = { likes: number; likedByUser: boolean; pathname: string };

export default function LikeCounter({ likes, likedByUser, pathname }: Props) {
  return (
    <Link to={pathname} className="flex items-center justify-center group">
      <Heart
        className={`w-4 h-4 text-red-700 group-hover:text-red-400 ${
          likedByUser && "fill-red-700"
        }`}
      />
      <span className="ml-2 text-sm group-hover:text-red-400">{likes}</span>
    </Link>
  );
}
