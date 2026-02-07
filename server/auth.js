import { betterAuth } from "better-auth";
import db from "./db.js";

export const auth = betterAuth({
    database: {
        db: db,
        type: "sqlite",
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [
        process.env.CLIENT_URL,
    ].filter(Boolean),
});
