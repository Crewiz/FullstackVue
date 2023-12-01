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
            const systemMessage: Message = { role: "system", content: "You are a helpful assistant that will create a recipe based on only the given ingredients, but you can ask for if its okay to add more ingredients if necessary" };
            const messages: Message[] = [systemMessage];
            const userMessage: Message = { role: "user", content: input.data.message };
            messages.push(userMessage);

            const response = await getOpenAIResponse(messages);
            console.log(response);

            return response;
            break;

        default:
            throw new Error('Invalid action');
    }
});

export type GptRouterType = typeof gptRouter;