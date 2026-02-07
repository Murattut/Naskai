import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import AIRoutes from "./routes/AIRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));
app.all("/api/auth/*splat", toNodeHandler(auth));

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
    console.log(`Server listening on port ${port}. Allowed Origin: ${process.env.CLIENT_URL}`);
});