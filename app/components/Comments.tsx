import { Link } from "@remix-run/react";
import { MessageCircle } from "lucide-react";

type Props = { commentCount: number; pathname: string; readonly: boolean };

export default function Comments({ commentCount, pathname, readonly }: Props) {
  return readonly ? (
    <div className="flex items-center justify-center group">
      <MessageCircle className="w-4 h-4 text-gray-500 " />
      <span className="ml-2 text-sm">{commentCount}</span>
    </div>
  ) : (
    <Link to={pathname} className="flex items-center justify-center group">
      <MessageCircle className="w-4 h-4 group-hover:text-gray-800" />
      <span className="ml-2 text-sm group-hover:text-gray-800">
        {commentCount}
      </span>
    </Link>
  );
}
