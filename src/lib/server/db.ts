import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

type PrismaGlobal = typeof globalThis & {
  csnptPrisma?: PrismaClient;
  csnptPgPool?: Pool;
  csnptPrismaSchemaVersion?: string;
};

const globalForPrisma = globalThis as PrismaGlobal;
let productionPrisma: PrismaClient | undefined;
let productionPool: Pool | undefined;
const CURRENT_PRISMA_SCHEMA_VERSION = "enterprise-saas-v5-postgresql";

// Next.js can hot-reload this module while preserving globalThis. Disconnect
// clients generated against an older schema before creating the new client.
if (
  process.env.NODE_ENV !== "production" &&
  globalForPrisma.csnptPrismaSchemaVersion !== CURRENT_PRISMA_SCHEMA_VERSION
) {
  const staleClient = globalForPrisma.csnptPrisma;
  globalForPrisma.csnptPrisma = undefined;
  globalForPrisma.csnptPgPool = undefined;
  globalForPrisma.csnptPrismaSchemaVersion = CURRENT_PRISMA_SCHEMA_VERSION;
  if (staleClient) {
    void staleClient.$disconnect().catch((error: unknown) => {
      console.error("Failed to disconnect stale Prisma client:", error);
    });
  }
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL must be configured to connect to PostgreSQL.");
  }

  try {
    const pool =
      process.env.NODE_ENV === "production"
        ? (productionPool ??= new Pool({ connectionString }))
        : (globalForPrisma.csnptPgPool ??= new Pool({ connectionString }));
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("Failed to initialize PostgreSQL Prisma client:", error);
    throw error;
  }
}

export function getDatabaseClient(): PrismaClient {
  if (process.env.NODE_ENV === "production") {
    productionPrisma ??= createPrismaClient();
    return productionPrisma;
  }

  globalForPrisma.csnptPrisma ??= createPrismaClient();
  return globalForPrisma.csnptPrisma;
}
