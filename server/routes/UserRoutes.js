import express from "express";
import {
    addNote,
    deleteNote,
    updateNote,
    getNote,
    getAllNotes,
    addTask,
    deleteTask,
    updateTask,
    getTask,
    getAllTasks
} from "../controllers/UserRoutesController.js";

const UserRoutes = express.Router();

// --- NOTES ---
UserRoutes.get("/notes", getAllNotes);
UserRoutes.post("/notes", addNote);
UserRoutes.get("/notes/:id", getNote);
UserRoutes.put("/notes/:id", updateNote);
UserRoutes.delete("/notes/:id", deleteNote);

// --- TASKS ---
UserRoutes.get("/tasks", getAllTasks);
UserRoutes.post("/tasks", addTask);
UserRoutes.get("/tasks/:id", getTask);
UserRoutes.put("/tasks/:id", updateTask);
UserRoutes.delete("/tasks/:id", deleteTask);

export default UserRoutes;