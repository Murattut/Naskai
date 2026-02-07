import Database from "better-sqlite3";
import { config } from "dotenv";
config();

const db = new Database("database.sqlite");
db.pragma('journal_mode = WAL');

const schema = `
    CREATE TABLE IF NOT EXISTS "user" (
        "id" text not null primary key, 
        "name" text not null, 
        "email" text not null unique, 
        "emailVerified" integer not null, 
        "image" text, 
        "createdAt" date not null, 
        "updatedAt" date not null
    );

    CREATE TABLE IF NOT EXISTS "session" (
        "id" text not null primary key, 
        "expiresAt" date not null, 
        "token" text not null unique, 
        "createdAt" date not null, 
        "updatedAt" date not null, 
        "ipAddress" text, 
        "userAgent" text, 
        "userId" text not null references "user" ("id") on delete cascade
    );

    CREATE TABLE IF NOT EXISTS "account" (
        "id" text not null primary key, 
        "accountId" text not null, 
        "providerId" text not null, 
        "userId" text not null references "user" ("id") on delete cascade, 
        "accessToken" text, 
        "refreshToken" text, 
        "idToken" text, 
        "accessTokenExpiresAt" date, 
        "refreshTokenExpiresAt" date, 
        "scope" text, 
        "password" text, 
        "createdAt" date not null, 
        "updatedAt" date not null
    );

    CREATE TABLE IF NOT EXISTS "verification" (
        "id" text not null primary key, 
        "identifier" text not null, 
        "value" text not null, 
        "expiresAt" date not null, 
        "createdAt" date not null, 
        "updatedAt" date not null
    );
    CREATE TABLE IF NOT EXISTS "task" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "title" TEXT NOT NULL CHECK(length(title) >= 3 AND length(title) <= 50),
        "content" TEXT NOT NULL CHECK(length(content) <= 2500),
        "isCompleted" BOOLEAN DEFAULT 0,
        "date" DATE DEFAULT CURRENT_TIMESTAMP,
        "imageUrl" TEXT,
        "userId" TEXT NOT NULL,
        "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS "note" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "title" TEXT NOT NULL CHECK(length(title) >= 3 AND length(title) <= 50),
        "summary" TEXT,
        "content" TEXT NOT NULL CHECK(length(content) <= 2500),
        "imageUrl" TEXT,
        "date" DATE DEFAULT CURRENT_TIMESTAMP,
        "userId" TEXT NOT NULL,
        "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS "session_userId_idx" on "session" ("userId");
    CREATE INDEX IF NOT EXISTS "account_userId_idx" on "account" ("userId");
    CREATE INDEX IF NOT EXISTS "verification_identifier_idx" on "verification" ("identifier");
`;

try {
    db.exec(schema);
    console.log("Database and tables checked/created successfully.");
} catch (error) {
    console.error("Database initialization error:", error.message);
}

export default db;