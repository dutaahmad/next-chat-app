import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `next-chat-app_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

// message table / entity
export const message = createTable("message", {
  id: uuid("id").notNull().primaryKey(),
  sender_id: varchar("id", { length: 255 })
    .notNull()
    .references(() => users.id),
  content: varchar("content", { length: 500 }).notNull(),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  recipient_id: varchar("id", { length: 255 })
    .notNull()
    .references(() => users.id),
});

export const usersMessageRelations = relations(users, ({ many }) => ({
  sentMessages: many(message),
  receivedMessages: many(message),
}));

export const messageUsersRelations = relations(message, ({ one }) => ({
  sender: one(users, { fields: [message.sender_id], references: [users.id] }),
  recipient: one(users, { fields: [message.recipient_id], references: [users.id] }),
}));

// // recipients table / entity (many-to-many relationship)
// export const recipients = createTable(
//   "recipients",
//   {
//     // id: uuid("id").primaryKey(),
//     message_id: uuid("message_id")
//       .notNull()
//       .references(() => message.id),
//     user_recipient_id: varchar("id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//   },
//   (table) => ({
//     pk: primaryKey({
//       columns: [table.message_id, table.user_recipient_id],
//     }),
//     index: unique()
//   }),
// );

// // Define relationships
// export const usersRecipientRelations = relations(users, ({ many }) => ({
//   sentMessages: many(message),
//   receivedMessages: many(recipients),
// }));

// export const messagesRelations = relations(message, ({ one, many }) => ({
//   sender: one(users, { fields: [message.sender_id], references: [users.id] }),
//   recipients: many(recipients),
// }));

// export const recipientsRelations = relations(recipients, ({ one }) => ({
//   message: one(message, { fields: [recipients.message_id], references: [message.id] }),
//   user: one(users, { fields: [recipients.user_recipient_id], references: [users.id] }),
// }));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
