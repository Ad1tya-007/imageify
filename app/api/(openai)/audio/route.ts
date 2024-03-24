import { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	const { story } =
		{
			story: "How has this weather been today? Are you doing alright?",
		} ?? req.body;

	const speechFile = path.resolve(".../speech.mp3");

	const mp3 = await openai.audio.speech.create({
		model: "tts-1",
		voice: "alloy",
		input: story,
	});
	const buffer = Buffer.from(await mp3.arrayBuffer());
	const response = new Response(buffer, {
		headers: { "Content-Type": "audio/mpeg" },
	});
	console.log(mp3);
	await fs.promises.writeFile(speechFile, buffer);

	return;
}
