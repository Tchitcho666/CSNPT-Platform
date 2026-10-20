This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

AI assistant is intentionally deferred to Phase 3. No AI functionality is part of the MVP.

## Database foundation

PostgreSQL is the planned persistent store. The initial Prisma schema is in
`prisma/schema.prisma`; the database client is server-only in
`src/lib/server/db.ts`. Routes and server components should call services in
`src/lib/services/`, never import Prisma directly. Existing public pages still
use their static reference data.

Set `DATABASE_URL` in the server environment. For Prisma CLI use, copy
`.env.example` to `.env` and replace its placeholders, or set the variable in
the shell. `prisma.config.ts` reads `.env` when present and deliberately does
not read `.env.local`. Never expose this variable through a `NEXT_PUBLIC_`
name.

Prisma Client generation runs after dependency installation and can also be run
manually with `npx prisma generate`. Validate the schema with
`npx prisma validate`. The checked-in initial migration is generated from the
schema; apply it to a configured PostgreSQL database with
`npx prisma migrate deploy` only after verifying the target connection.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
