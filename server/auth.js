import { betterAuth } from "better-auth";
import db from "./db.js";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing in env");
}

export const auth = betterAuth({
    database: {
        db: db,
        type: "sqlite", // specific type for Kysely with LibSQL
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    trustedOrigins: [process.env.CLIENT_URL],
    baseURL: process.env.BETTER_AUTH_URL,
    advanced: {
        logger: {
            level: "debug",
            disabled: false
        }
    },
});