import { ChevronUp, Send, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { cn } from "~/lib/utils";

export default function NewPost() {
  const [isFocused, setIsFocused] = useState(false);

  // TODO - fix fade
  return (
    <Card
      className={cn(
        "relative mb-6 border-2 border-indigo-400 shadow-sm overflow-hidden transition-all ease-in-out delay-150 duration-500",
        isFocused ? "min-h-36" : "h-10"
      )}
    >
      <Textarea
        onFocus={() => setIsFocused(true)}
        className="border-none resize-none focus:border-e-red-100 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Share your thoughts..."
      />

      <Button
        size={"icon"}
        variant={"ghost"}
        className={cn("absolute top-2 right-4", !isFocused && "invisible")}
        onClick={() => setIsFocused(false)}
      >
        <ChevronUp className="text-indigo-400" />
      </Button>

      <Button
        className={cn(
          "absolute bg-indigo-400 right-4 bottom-4 invisible",
          isFocused && "flex visible"
        )}
        size={"sm"}
      >
        Share
        <Send className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  );
}
