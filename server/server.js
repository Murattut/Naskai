import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";

const app = express();
const port = 8000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "PUT", "DELETE"],
}));
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.use("/api", UserRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});