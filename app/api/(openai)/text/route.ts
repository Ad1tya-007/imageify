import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: any, res: NextApiResponse) {
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString('utf-8');

  // Now `body` is a string that contains your JSON data
  const jsonData = JSON.parse(body);

  const cloudinaryResp = await cloudinary.v2.api.resource(jsonData.publicId, {
    resource_type: 'video',
  });

  console.log(cloudinaryResp.tags);

  const query = `Could you generate a short story with the follow description: ${
    jsonData.description
  } and the given tags ${cloudinaryResp.tags.join(', ')}?`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: query ?? 'Tell me about yourself' }],
    model: 'gpt-3.5-turbo',
  });

  const data = completion.choices[0].message.content;
  console.log(data);
  return NextResponse.json({ story: data });
}
