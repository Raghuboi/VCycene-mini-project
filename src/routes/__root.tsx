import { Outlet, createRootRoute, Link } from "@tanstack/react-router";

import { QueueRouteError } from "./route-error";

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  errorComponent: QueueRouteError,
  notFoundComponent: () => (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-4 py-16">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Monday queue</p>
      <h1 className="text-xl font-semibold">There is no page at this address.</h1>
      <p className="text-sm text-muted-foreground">
        The queue lives at the root of this site. Nothing was changed.
      </p>
      <div>
        <Link
          to="/"
          search={{ view: "all" }}
          className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Return to queue
        </Link>
      </div>
    </main>
  ),
});
