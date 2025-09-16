import { openai } from "./openai";

export async function generateArticleMarkdown({
    topic,
    audience = "general readers",
    tone = "friendly",
    words = 900,
}: {
    topic: string;
    audience?: string;
    tone?: string;
    words?: number;
}) {
    const prompt = `Write a ${words}-word article about "${topic}" for ${audience} in a ${tone} tone.
Use clear headings (H2/H3), short paragraphs, a 2-sentence summary, and 3–5 actionable takeaways.`;

    const res = await openai.responses.create({
        model: "gpt-4o-mini",
        input: prompt,
        temperature: 0.5,
    });

    return res.output_text;
}
