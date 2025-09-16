// src/lib/generateArticleJson.ts
import { openai } from "./openai";

const args = process.argv.slice(2);

export async function generateCandidates(seed: string, count: number) {
    const res = await openai.responses.create({
        model: "gpt-4o-mini",
        instructions: "Return ONLY JSON.",
        input: `Give ${count} distinct article ideas on "${seed}". 
For each: {title, scope, audience, format, context}. No duplicates.`,
        temperature: 0.7,
    });
    console.log("generate candidates output res");
    console.log(res);
    console.log(JSON.parse(res.output_text));
}

export async function generateArticleJSON(topic: string) {
    const system = `You are a careful content writer.`;
    const user = `Write an article on: ${topic}.
 Tone: clear, helpful. 900–1100 words.`;

    const res = await openai.responses.create({
        model: "gpt-4o-mini",
        instructions: system,
        input: user,
        temperature: 0.4,
    });

    console.log("res");
    console.log(res);
}

if (args.length > 0) {
    generateCandidates(args[0], 10);
}
