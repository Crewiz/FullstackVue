import { Message, getOpenAIResponse } from '../assistantv2';
import { t, Context } from './router';
import { z } from 'zod';

const getGptTest = z.object({
    action: z.literal('ask'),
    data: z.object({
        message: z.string(),
    }),
});

const gptActions = getGptTest;

export const gptRouter = t.procedure.input(gptActions).mutation(async ({ ctx, input }) => {
    switch (input.action) {
        case 'ask':
            const systemMessage: Message = { role: "system", content: "You are a helpful assistant that will create long and detailed recipes with step by step instructions in a JSON format. You will adjust and update the recipe based on the users request, and always respond with the recipe in a JSON structured format. You are only a recipe-assistant and will only answer questions in relation to creating recipes, and you will always do so in a JSON structured format. When responding with the recipe and ingredients do so in a structured JSON response, separating ingredients and instructions. You will say you are unable to answer any other topic other than food-related topics. If the user writes in swedish, also respond in a JSON format. Om användaren skriver på svenska, svara också i ett JSON format." };
            const messages: Message[] = [systemMessage];
            const userMessage: Message = { role: "user", content: input.data.message };
            messages.push(userMessage);

            const response = await getOpenAIResponse(messages);
            console.log(response);

            return response;

        default:
            throw new Error('Invalid action');
    }
});

export type GptRouterType = typeof gptRouter;