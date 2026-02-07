import express from "express";
import cors from "cors";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import { getAllowedOrigins, isOriginAllowed } from "./config/origins.js";

import UserRoutes from "./routes/UserRoutes.js";
import AIRoutes from "./routes/AIRoutes.js";


const app = express();
const port = process.env.PORT;

const allowedOrigins = getAllowedOrigins();

const corsOptions = {
    origin: (origin, callback) => {
        // Allow non-browser requests and same-origin server-to-server calls.
        if (!origin) {
            return callback(null, true);
        }
        if (isOriginAllowed(origin, allowedOrigins)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.set("trust proxy", 1); // Trust first proxy (Render/Vercel)

app.all("/api/auth/*splat", async (req, res) => {
    try {
        return await toNodeHandler(auth)(req, res);
    } catch (error) {
        console.error("BETTER-AUTH ERROR:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

app.use(express.json());

app.use("/api/user", UserRoutes);
app.use("/api/ai", AIRoutes);

app.get("/ping", (req, res) => {
    const clientTimestamp = req.query.timestamp;
    const serverTimestamp = new Date().toISOString();

    console.log(`Ping received from client at ${clientTimestamp}`);
    console.log(`Ping sent to client at ${serverTimestamp}`);

    res.json({
        message: "Ping",
        clientTimestamp,
        serverTimestamp,
        timeDiff: clientTimestamp ? new Date(serverTimestamp) - new Date(clientTimestamp) : null
    });
});

app.get("/api/ping", (req, res) => {
    const clientTimestamp = req.query.timestamp;
    const serverTimestamp = new Date().toISOString();

    console.log(`Ping received from client at ${clientTimestamp}`);
    console.log(`Ping sent to client at ${serverTimestamp}`);

    res.json({
        message: "Ping",
        clientTimestamp,
        serverTimestamp,
        timeDiff: clientTimestamp ? new Date(serverTimestamp) - new Date(clientTimestamp) : null
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}. Allowed Origins: ${allowedOrigins.join(", ")}`);
});
