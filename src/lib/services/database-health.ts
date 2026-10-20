import "server-only";

import { getDatabaseClient } from "@/lib/server/db";

export type DatabaseHealth = "available" | "unavailable";

/** Returns only a safe status; connection details and driver errors stay server-side. */
export async function checkDatabaseHealth(): Promise<DatabaseHealth> {
  try {
    await getDatabaseClient().$queryRaw`SELECT 1`;
    return "available";
  } catch {
    return "unavailable";
  }
}
