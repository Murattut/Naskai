import express from "express";
import { config } from "dotenv";
config({ path: "./config/.env" });
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import AIRoutes from "./routes/AIRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "PUT", "DELETE"],
}));
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.use("/api/user", UserRoutes);
app.use("/api/ai", AIRoutes);

// Ping-pong endpoint for health check
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

app.listen(port, () => {
    console.log(`Server listening on client url ${process.env.CLIENT_URL} and server port ${port}`);
});