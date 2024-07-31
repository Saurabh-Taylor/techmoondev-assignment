"use server";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY! ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

const systemPrompt = `"Generate social media posts based on the user's input. "`;

export async function generateSocialMediaPosts({input}:{input:string}) {
  const {
    object: data,
    warnings,
    finishReason,
    rawResponse,
  } = await generateObject({
    model: groq("mixtral-8x7b-32768"),
    system: systemPrompt,
    temperature: 2,
    maxTokens: 16000,
    prompt: input,
    mode: "json",
    schema: z.object({
      data: z.array(
        z.object({
          questions: z.string().describe(""),
        })
      ),
    }),
  });
  console.log(warnings, finishReason, rawResponse);

  return { data };
}
