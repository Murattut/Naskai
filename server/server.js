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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});