import db from "../db.js";
import { auth } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { sql } from "kysely";

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
        const noteDate = date ? date : new Date().toISOString();
        const result = await sql`
            INSERT INTO note (title, content, summary, imageUrl, date, userId) 
            VALUES (
                ${title || "Adsız Not"}, 
                ${content || ""},      /* Content zorunlu ise boş string, değilse null */
                ${summary ?? null},    /* Undefined gelirse NULL yap */
                ${imageUrl ?? null},   /* Undefined gelirse NULL yap */
                ${noteDate}, 
                ${user.id}
            ) 
            RETURNING *
        `.execute(db);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Add Note Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const result = await sql`
            SELECT * FROM note 
            WHERE userId = ${user.id} 
            ORDER BY date DESC
        `.execute(db);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Get All Notes Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const result = await sql`
            DELETE FROM note 
            WHERE id = ${id} AND userId = ${user.id}
        `.execute(db);

        if (Number(result.numAffectedRows) === 0) {
             return res.status(404).json({ error: "Not found or unauthorized" });
        }
        res.status(200).json({ success: true, id });
    } catch (error) {
        console.error("Delete Note Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const { title, content, summary, imageUrl, date } = req.body;

        const result = await sql`
            UPDATE note 
            SET 
                title = COALESCE(${title ?? null}, title),
                content = COALESCE(${content ?? null}, content),
                summary = COALESCE(${summary ?? null}, summary),
                imageUrl = COALESCE(${imageUrl ?? null}, imageUrl),
                date = COALESCE(${date ?? null}, date)
            WHERE id = ${id} AND userId = ${user.id} 
            RETURNING *
        `.execute(db);

        if (result.rows.length === 0) return res.status(404).json({ error: "Not found or unauthorized" });

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Update Note Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getNote = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const result = await sql`
            SELECT * FROM note 
            WHERE id = ${id} AND userId = ${user.id}
        `.execute(db);

        const note = result.rows[0];
        if (!note) return res.status(404).json({ error: "Not found" });
        res.status(200).json(note);
    } catch (error) {
        console.error("Get Note Error:", error);
        res.status(500).json({ error: error.message });
    }
};

/* --- TASK CONTROLLERS --- */

export const addTask = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { title, content, date, imageUrl, isCompleted } = req.body;
        const taskDate = date ? date : new Date().toISOString();
        
        const completedVal = isCompleted ? 1 : 0;

        const result = await sql`
            INSERT INTO task (title, content, date, imageUrl, userId, isCompleted) 
            VALUES (
                ${title || "Yeni Görev"}, 
                ${content || ""}, 
                ${taskDate}, 
                ${imageUrl ?? null}, /* Undefined yerine NULL */
                ${user.id}, 
                ${completedVal}
            ) 
            RETURNING *
        `.execute(db);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Add Task Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const result = await sql`
            SELECT * FROM task 
            WHERE userId = ${user.id} 
            ORDER BY date DESC
        `.execute(db);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Get All Tasks Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const result = await sql`
            DELETE FROM task 
            WHERE id = ${id} AND userId = ${user.id}
        `.execute(db);

        if (Number(result.numAffectedRows) === 0) return res.status(404).json({ error: "Not found" });
        res.status(200).json({ success: true, id });
    } catch (error) {
        console.error("Delete Task Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
     try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const { title, content, date, imageUrl, isCompleted } = req.body;
        
        let completedVal = null;
        if (isCompleted !== undefined) {
            completedVal = isCompleted ? 1 : 0;
        }

        const result = await sql`
            UPDATE task 
            SET 
                title = COALESCE(${title ?? null}, title),
                content = COALESCE(${content ?? null}, content),
                date = COALESCE(${date ?? null}, date),
                imageUrl = COALESCE(${imageUrl ?? null}, imageUrl),
                isCompleted = COALESCE(${completedVal}, isCompleted)
            WHERE id = ${id} AND userId = ${user.id} 
            RETURNING *
        `.execute(db);

        if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Update Task Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const result = await sql`
            SELECT * FROM task 
            WHERE id = ${id} AND userId = ${user.id}
        `.execute(db);

        const task = result.rows[0];
        if (!task) return res.status(404).json({ error: "Not found" });
        res.status(200).json(task);
    } catch (error) {
        console.error("Get Task Error:", error);
        res.status(500).json({ error: error.message });
    }
};