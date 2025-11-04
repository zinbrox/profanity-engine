import express, { type Request, type Response } from "express";
import { ProfanityFilter } from "./index";

const app = express();
app.use(express.json());

// Initialize profanity filter with some words
const filter = new ProfanityFilter(["badword", "verybad", "evil", "stupid"]);

// POST /check
// Body: { "text": "your text here" }
app.post("/check", (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "text is required" });
    }

    const hasProfanity = filter.contains(text);
    const matches = filter.find(text);
    const censored = filter.censor(text);

    return res.json({
        original: text,
        profane: hasProfanity,
        matches,
        censored
    });
});

// Start server
app.listen(3000, () => {
    console.log("Profanity API running at http://localhost:3000");
});
