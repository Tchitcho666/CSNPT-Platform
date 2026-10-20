# Data access boundary

Routes and components should read domain data through the relevant modules in
`src/lib/services/`. Services depend on domain repository contracts in
`src/lib/repositories/`; repositories own the choice of data source.

The current `static*Repository` implementations adapt the existing reference
data. They do not connect to PostgreSQL. When a domain is ready to use
PostgreSQL, add a server-only repository implementation for that domain and
select it at a server-side service boundary. Keep Prisma imports inside that
implementation; client components must continue to consume only client-safe
services or server-rendered props. Services are split by domain to avoid
coupling a client bundle to unrelated data.

The resource list and detail views have distinct existing representations for
the same IDs. Both are retained in `src/lib/data/resources.static.ts` so this
boundary change preserves each route's current content. Reconcile those
representations as a separately reviewed content decision.
