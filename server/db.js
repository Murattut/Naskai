import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
    console.error("Error: TURSO_DATABASE_URL or TURSO_AUTH_TOKEN not found in .env");
    process.exit(1);
}

const db = new Kysely({
    dialect: new LibsqlDialect({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    }),
});

export default db;