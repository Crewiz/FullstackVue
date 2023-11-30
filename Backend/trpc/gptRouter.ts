import { t, Context } from './router';
import { Configuration, OpenAIApi } from 'openai';


export const gptRouter = t.router({
  askOpenAI: t.procedure
  .input(z => z.object({ prompt: z.string() }))
  .query(async ({ input }) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createcompletion({
            model: 
        })
    }
  }) 