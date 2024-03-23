import { Link } from "@remix-run/react";
import Markdown from "react-markdown";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { ChevronDown, Dot } from "lucide-react";
import { Button } from "../ui/button";

type User = {
  avatarUrl: string;
  name: string;
  id: string;
  username: string;
};

type Props = {
  id?: string;
  title: string;
  author: User;
  dateTimeString: string;
  children?: React.ReactNode;
};

type HeaderProps = {
  author: User;
  createdAt: string;
};

function PostHeader({ author, createdAt }: HeaderProps) {
  return (
    <div className="flex items-center w-full">
      <img
        alt="Profile"
        className="mr-2 rounded-full"
        height={50}
        width={50}
        src={author.avatarUrl}
        style={{ aspectRatio: "50/50", objectFit: "cover" }}
      />
      <div className="flex flex-col">
        <Link
          to={`/profile/${author.username}`}
          className="flex items-center mb-1 space-x-1"
        >
          <span className="text-sm font-semibold md:text-md">
            {author.name}
          </span>
          <Dot className="text-indigo-400" />
          <span className="text-xs text-indigo-400 md:text-sm">
            {`@${author.username}`}
          </span>
        </Link>
        <span className="text-xs text-indigo-400">{createdAt}</span>
      </div>
    </div>
  );
}

export default function Post({
  id,
  title,
  author,
  dateTimeString,
  children,
}: Props) {
  return (
    <div
      key={id}
      className="w-full p-4 mb-6 bg-white rounded-sm shadow-sm md:p-6"
    >
      <PostHeader author={author} createdAt={dateTimeString} />
      <div className="flex items-center w-full">
        <div className="flex flex-col w-full">
          <div className="mt-4 text-sm prose text-gray-500">
            <Markdown>{title}</Markdown>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <div className="flex space-x-4 text-gray-400">{children}</div>
          </div>
          <Separator className="my-2" />
        </div>
      </div>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="flex space-x-4 min-h-[12rem] my-3 p-8">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
}
