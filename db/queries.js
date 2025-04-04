"server-only";

import { genSaltSync, hashSync } from "bcrypt";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { chat, user } from "./schema";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL is not defined");
}

let client = postgres(`${process.env.POSTGRES_URL}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email) {
    try {
        return await db.select().from(user).where(eq(user.email, email));
    } catch (error) {
        console.error("Failed to get user from database");
        throw error;
    }
}

export async function createUser(email, password) {
    let salt = genSaltSync(10);
    let hash = hashSync(password, salt);

    try {
        return await db.insert(user).values({ email, password: hash });
    } catch (error) {
        console.error("Failed to create user in database");
        throw error;
    }
}

export async function saveChat({ id, messages, userId }) {
    try {
        const selectedChats = await db.select().from(chat).where(eq(chat.id, id));

        if (selectedChats.length > 0) {
            return await db
                .update(chat)
                .set({
                    messages: JSON.stringify(messages),
                })
                .where(eq(chat.id, id));
        }

        return await db.insert(chat).values({
            id,
            createdAt: new Date(),
            messages: JSON.stringify(messages),
            userId,
        });
    } catch (error) {
        console.error("Failed to save chat in database");
        throw error;
    }
}

export async function deleteChatById({ id }) {
    try {
        return await db.delete(chat).where(eq(chat.id, id));
    } catch (error) {
        console.error("Failed to delete chat by id from database");
        throw error;
    }
}

export async function getChatsByUserId({ id }) {
    try {
        return await db
            .select()
            .from(chat)
            .where(eq(chat.userId, id))
            .orderBy(desc(chat.createdAt));
    } catch (error) {
        console.error("Failed to get chats by user from database");
        throw error;
    }
}

export async function getChatById({ id }) {
    try {
        const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
        return selectedChat;
    } catch (error) {
        console.error("Failed to get chat by id from database");
        throw error;
    }
}
