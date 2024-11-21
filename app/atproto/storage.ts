import type {
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";
import { authStateTable, authSessionTable } from "#db/schema";
import { type Database } from "#drizzle";
import { eq } from "drizzle-orm";

export class StateStore implements NodeSavedStateStore {
  constructor(private db: Database) {}
  async get(key: string): Promise<NodeSavedState | undefined> {
    const result = await this.db
      .select()
      .from(authStateTable)
      .where(eq(authStateTable.key, key));
    if (!result.length) return;
    return JSON.parse(result[0].state) as NodeSavedState;
  }
  async set(key: string, value: NodeSavedState) {
    const state = JSON.stringify(value);
    await this.db
      .insert(authStateTable)
      .values({ key, state })
      .onConflictDoUpdate({ target: authStateTable.state, set: { state } });
  }
  async del(key: string) {
    await this.db.delete(authStateTable).where(eq(authStateTable.key, key));
  }
}

export class SessionStore implements NodeSavedSessionStore {
  constructor(private db: Database) {}
  async get(key: string): Promise<NodeSavedSession | undefined> {
    const result = await this.db
      .select()
      .from(authSessionTable)
      .where(eq(authSessionTable.key, key));
    if (!result.length) return;
    return JSON.parse(result[0].session) as NodeSavedSession;
  }
  async set(key: string, value: NodeSavedSession) {
    const session = JSON.stringify(value);
    await this.db
      .insert(authSessionTable)
      .values({ key, session })
      .onConflictDoUpdate({
        target: authSessionTable.session,
        set: { session },
      });
  }
  async del(key: string) {
    await this.db.delete(authSessionTable).where(eq(authSessionTable.key, key));
  }
}
