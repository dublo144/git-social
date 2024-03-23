import { Form, useSubmit } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";

type Props = { searchQuery: string; isSearching: boolean };

export default function PostSearch({ searchQuery, isSearching }: Props) {
  const [query, setQuery] = useState(searchQuery || "");
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeoutRef]);

  return (
    <div className="flex items-center justify-between my-3">
      <h2 className="w-7/12 font-bold text-indigo-500 md:text-xl">
        {query ? `Results for "${query}"` : "My Feed"}
      </h2>
      <div className="flex justify-center w-1/12">
        {isSearching && <Loader2 className="w-4 h-4 animate-spin" />}
      </div>
      <Form
        role="search"
        ref={formRef}
        id="search-form"
        className="flex w-4/12"
        onChange={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            if (formRef.current) {
              // Only submit if query is present
              submit(formRef.current);
            } else {
              console.error("Wooops");
            }
          }, 250);
        }}
      >
        <Input
          type="search"
          name="query"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search posts"
        />
      </Form>
    </div>
  );
}
