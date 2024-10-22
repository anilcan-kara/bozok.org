import { json, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("User", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    email: varchar("email", { length: 64 }).notNull(),
    password: varchar("password", { length: 64 }),
});

export const chat = pgTable("Chat", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    createdAt: timestamp("createdAt").notNull(),
    messages: json("messages").notNull(),
    userId: uuid("userId")
        .notNull()
        .references(() => user.id),
});
