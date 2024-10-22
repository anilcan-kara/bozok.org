import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

if (!process.env.POSTGRES_URL) {
    throw new Error("Missing POSTGRES_URL in .env.local");
}

export default defineConfig({
    schema: "./db/schema.ts",
    out: "./lib/drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.POSTGRES_URL,
    },
});
