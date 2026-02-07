import { createAuthClient } from "better-auth/react"
import dotenv from "dotenv";
dotenv.config();

export const { signIn, signUp, useSession, signOut } = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BASE_URL || "http://localhost:8000"
})
