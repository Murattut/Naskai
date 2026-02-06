import db from "../db.js";
import { auth } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";

const getSessionUser = async (req) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });
    if (!session) return null;
    return session.user;
};

/* --- NOTE CONTROLLERS --- */

export const addNote = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { title, content, summary, imageUrl, date } = req.body;

        // Add note to database
        // Use provided date as date if available (for backdating/future), else default
        const noteDate = date ? date : new Date().toISOString();

        const stmt = db.prepare("INSERT INTO note (title, content, summary, imageUrl, date, userId) VALUES (?, ?, ?, ?, ?, ?)");
        const info = stmt.run(title || "Adsız Not", content, summary, imageUrl, noteDate, user.id);

        // Return added note
        const newNote = db.prepare("SELECT * FROM note WHERE id = ?").get(info.lastInsertRowid);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        // Order by date DESC
        const notes = db.prepare("SELECT * FROM note WHERE userId = ? ORDER BY date DESC").all(user.id);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        // Security: Only user delete own note (AND userId = ?)
        const info = db.prepare("DELETE FROM note WHERE id = ? AND userId = ?").run(id, user.id);

        if (info.changes === 0) return res.status(404).json({ error: "Not found or unauthorized" });
        res.status(200).json({ success: true, id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const { title, content, summary, imageUrl, date } = req.body;

        const updateFields = [];
        const updateValues = [];

        if (title !== undefined) { updateFields.push("title = ?"); updateValues.push(title); }
        if (content !== undefined) { updateFields.push("content = ?"); updateValues.push(content); }
        if (summary !== undefined) { updateFields.push("summary = ?"); updateValues.push(summary); }
        if (imageUrl !== undefined) { updateFields.push("imageUrl = ?"); updateValues.push(imageUrl); }
        if (date !== undefined) { updateFields.push("date = ?"); updateValues.push(date); }

        if (updateFields.length === 0) return res.status(400).json({ error: "No fields to update" });

        updateValues.push(id, user.id); // Validating ownership

        const stmt = db.prepare(`UPDATE note SET ${updateFields.join(", ")} WHERE id = ? AND userId = ?`);
        const info = stmt.run(...updateValues);

        if (info.changes === 0) return res.status(404).json({ error: "Not found or unauthorized" });

        const updatedNote = db.prepare("SELECT * FROM note WHERE id = ?").get(id);
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNote = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const note = db.prepare("SELECT * FROM note WHERE id = ? AND userId = ?").get(id, user.id);

        if (!note) return res.status(404).json({ error: "Not found" });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* --- TASK CONTROLLERS --- */

export const addTask = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { title, content, date, imageUrl, isCompleted } = req.body;

        // date from client maps to date in DB
        const taskDate = date ? date : new Date().toISOString();

        const stmt = db.prepare("INSERT INTO task (title, content, date, imageUrl, userId, isCompleted) VALUES (?, ?, ?, ?, ?, ?)");
        const info = stmt.run(title, content, taskDate, imageUrl, user.id, isCompleted ? 1 : 0);

        const newTask = db.prepare("SELECT * FROM task WHERE id = ?").get(info.lastInsertRowid);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        // Order by date DESC
        const tasks = db.prepare("SELECT * FROM task WHERE userId = ? ORDER BY date DESC").all(user.id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const info = db.prepare("DELETE FROM task WHERE id = ? AND userId = ?").run(id, user.id);

        if (info.changes === 0) return res.status(404).json({ error: "Not found" });
        res.status(200).json({ success: true, id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const { title, content, date, imageUrl, isCompleted } = req.body;

        const updateFields = [];
        const updateValues = [];

        if (title !== undefined) { updateFields.push("title = ?"); updateValues.push(title); }
        if (content !== undefined) { updateFields.push("content = ?"); updateValues.push(content); }
        if (date !== undefined) { updateFields.push("date = ?"); updateValues.push(date); }
        if (imageUrl !== undefined) { updateFields.push("imageUrl = ?"); updateValues.push(imageUrl); }
        if (isCompleted !== undefined) { updateFields.push("isCompleted = ?"); updateValues.push(isCompleted ? 1 : 0); }

        if (updateFields.length === 0) return res.status(400).json({ error: "No fields to update" });

        updateValues.push(id, user.id);

        const stmt = db.prepare(`UPDATE task SET ${updateFields.join(", ")} WHERE id = ? AND userId = ?`);
        const info = stmt.run(...updateValues);

        if (info.changes === 0) return res.status(404).json({ error: "Not found" });

        const updatedTask = db.prepare("SELECT * FROM task WHERE id = ?").get(id);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const task = db.prepare("SELECT * FROM task WHERE id = ? AND userId = ?").get(id, user.id);

        if (!task) return res.status(404).json({ error: "Not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};