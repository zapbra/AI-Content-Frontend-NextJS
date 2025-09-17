import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import "dotenv/config";
import { z } from "zod";

const args = process.argv.slice(2);

const itemSchema = z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).max(5),
});

export async function generateCandidates(seed: string, count: number = 10) {
    const { object: items } = await generateObject({
        model: openai.responses("gpt-4o"),
        prompt: `Generate ${count} article ideas based on the topic of ${seed}`,
        schema: itemSchema,
        output: "array",
    });

    console.log("result");
    console.log(items);
}

if (args.length > 0) {
    generateCandidates(args[0]);
}
