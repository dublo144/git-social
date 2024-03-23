import { Link } from "@remix-run/react";
import { MessageCircle } from "lucide-react";

type Props = { commentCount: number; pathname: string; readonly?: boolean };

export default function Comments({
  commentCount,
  pathname,
  readonly = false,
}: Props) {
  return readonly ? (
    <div className="flex items-center justify-center group">
      <MessageCircle className="w-4 h-4 text-gray-500 " />
      <span className="ml-2 text-sm">{commentCount}</span>
    </div>
  ) : (
    <Link to={pathname} className="flex items-center justify-center group">
      <MessageCircle className="w-4 h-4 text-gray-400 transition-transform duration-500 group-hover:fill-indigo-500 group-hover:text-indigo-500 group-hover:-translate-y-1" />
      <span className="ml-2 text-sm">{commentCount}</span>
    </Link>
  );
}
