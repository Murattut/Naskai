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
    trustedOrigins: [process.env.CLIENT_URL],
    baseURL: process.env.BETTER_AUTH_URL,
    advanced: {
        crossContextCookies: true,
    },
    cookie: {
        namePrefix: "better-auth",
        attributes: {
            sameSite: "none",
            secure: true,
            httpOnly: true
        }
    }
});