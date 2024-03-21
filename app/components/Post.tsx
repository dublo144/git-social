import { Link } from "@remix-run/react";
import { Card } from "./ui/card";
import AppLogo from "./AppLogo";
import Markdown from "react-markdown";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

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

export default function Post({
  id,
  title,
  author,
  dateTimeString,
  children,
}: Props) {
  return (
    <Card
      key={id}
      className="rounded-xl shadow-md overflow-hidden min-[12rem] mb-6"
    >
      <div className="w-full p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              alt="Profile"
              className="mr-2 rounded-full"
              height={40}
              width={40}
              src={author.avatarUrl}
              style={{ aspectRatio: "40/40", objectFit: "cover" }}
            />
            <div>
              <div className="text-sm font-semibold md:text-lg">
                <Link to={`/profile/${author.username}`}>{author.name}</Link>
              </div>
              <div className="text-sm font-semibold text-gray-400 md:text-md">
                <Link
                  to={`/profile/${author.username}`}
                >{`@${author.username}`}</Link>
              </div>
            </div>
          </div>
          <AppLogo className="w-8 h-8" />
        </div>
        <div className="mt-4 text-sm prose text-gray-500">
          <Markdown>{title}</Markdown>
        </div>

        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <div className="flex space-x-4 text-gray-400">{children}</div>
          <div className="text-sm text-gray-400">{dateTimeString}</div>
        </div>
      </div>
    </Card>
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
