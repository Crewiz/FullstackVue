import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getOpenAIResponse(messages: Message[]): Promise<string | null> {
  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating OpenAI response:", error);
    return "I'm sorry, but I encountered an error.";
  }
}

export type Message = {
  role: "user" | "assistant" | "system";
  content: string | null;
};

