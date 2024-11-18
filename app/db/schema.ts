import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const statusTable = sqliteTable("status_table", {
  uri: text("uri").primaryKey(),
  author_did: text("author_did").notNull(),
  status: text("status").notNull(),
  created_at: text("created_at").notNull(),
  indexed_at: text("indexed_at").notNull(),
});

export const authSessionTable = sqliteTable("auth_session_table", {
  key: text("key").primaryKey(),
  session: text("session").notNull(),
});

export const authStateTable = sqliteTable("auth_state_table", {
  key: text("key").primaryKey(),
  state: text("state").notNull(),
});
