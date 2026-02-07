import { auth } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.Groq_key });

const getSessionUser = async (req) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });
    if (!session) return null;
    return session.user;
};

/* --- AI CONTROLLERS --- */

/* Summarize button */
export const generateSummaryTitle = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { content } = req.body;
        if (!content) return res.status(400).json({ error: "Content is required" });

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI assistant that summarizes the content of user notes. Output ONLY the summary of the text, without any introductory or concluding remarks."
                },
                {
                    role: "user",
                    content: `Summarize the following note into a short, concise title (max 5-6 words): "${content}"`
                }
            ],
            model: "llama-3.1-8b-instant",
        });

        const title = completion.choices[0]?.message?.content || "Untitled Note";
        return res.status(200).json({ title });
    } catch (error) {
        console.error("Error generating summary:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/* Enhance button */
export const generateEnhancedContent = async (req, res) => {
    try {
        const user = await getSessionUser(req);
        if (!user) return res.status(401).json({ error: "Unauthorized" });

        const { content } = req.body;
        if (!content) return res.status(400).json({ error: "Content is required" });

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI assistant that improves the clarity, grammar, and tone of user notes. Output ONLY the enhanced version of the text, without any introductory or concluding remarks."
                },
                {
                    role: "user",
                    content: `Enhance and polish the following text:\n\n${content}`
                }
            ],
            model: "llama-3.1-8b-instant",
        });

        const enhancedContent = completion.choices[0]?.message?.content || content;
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        console.error("Error enhancing content:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
