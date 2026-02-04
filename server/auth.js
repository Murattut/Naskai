import { betterAuth } from "better-auth";
import db from "./db.js";

export const auth = betterAuth({
    database: db,
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    trustedOrigins: ["http://localhost:3000"],
    advanced: {
        logger: {
            level: "debug",
            disabled: false
        }
    },
});