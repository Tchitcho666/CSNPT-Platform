# Service boundary

Routes and server components call functions from `src/lib/services/`. Service
modules contain server-side application operations and obtain the Prisma client
through `src/lib/server/db.ts`. Only that server database module constructs or
exports the Prisma client; UI components must not import Prisma.

The boundary is:

`UI / Route → Service → Prisma client → PostgreSQL`

`database-health.ts` demonstrates a minimal service operation. It returns a
safe status and does not expose driver errors or connection details. Domain
CRUD services are intentionally not created in this foundation task.
Future audit-log writes must be append-only; no update or delete operation is
defined by this service seam.

The directory follows the same boundary: server routes call the directory
service, which projects static practitioner records into `PublicPractitioner`
before passing data to client components. The public projection contains only
the profile slug, name, professional title, and city. It excludes contact and
reference fields, badges, and precise coordinates. The centre source record is
preserved but withheld from public results pending Bureau confirmation of
centre-listing eligibility. The map therefore does not plot individual records.
