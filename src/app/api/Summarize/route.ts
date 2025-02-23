import { OpenAI } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { text, length, style } = req.body;

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Summarize the following text in ${length} length and in a ${style} style: ${text}`,
                },
            ],
            model: "gpt-3.5-turbo",
        });
        res.status(200).json(completion.choices[0].message.content);
    } catch (error) {
        console.error('Error:', (error as Error).message);
        res.status(400).json({ error: (error as Error).message });
    }
}
