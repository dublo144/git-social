import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";

import styles from "./tailwind.css";
import {
  getSupabaseEnv,
  getSupabaseWithSessionAndHeaders,
} from "./lib/supabase.server";
import { useSupabase } from "./lib/supabase";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { serverSession, headers } = await getSupabaseWithSessionAndHeaders({
    request,
  });
  const env = getSupabaseEnv();
  const domainUrl = process.env.DOMAIN_URL;
  return json({ serverSession, env, domainUrl }, { headers });
};

export default function App() {
  const { env, serverSession, domainUrl } = useLoaderData<typeof loader>();

  const { supabase } = useSupabase({ env, serverSession });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ supabase, domainUrl }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
