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
                    content: "You are an expert editor specializing in summarizing text into concise titles. Your task is to generate a short, relevant title based on the provided text. Rules:\n1. Output ONLY the title.\n2. Do not use quotation marks.\n3. Do not add labels like 'Title:'.\n4. Keep it between 3 to 6 words.\n5. Avoid periods at the end."
                },
                {
                    role: "user",
                    content: content
                }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.3,
            max_tokens: 15,
        });

        const title = completion.choices[0]?.message?.content?.trim() || "Untitled Note";
        return res.status(200).json({ title });
    } catch (error) {
        console.error("Error generating summary:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

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
                    content: "You are a professional copywriter. Your task is to enhance the user's text for clarity, grammar, and flow while strictly maintaining the original meaning. Rules:\n1. Output ONLY the enhanced text.\n2. Do not add introductory phrases like 'Here is the improved version'.\n3. Do not add new information or facts not present in the original text.\n4. Maintain a professional but neutral tone."
                },
                {
                    role: "user",
                    content: content
                }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.4,
        });

        const enhancedContent = completion.choices[0]?.message?.content?.trim() || content;
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        console.error("Error enhancing content:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};