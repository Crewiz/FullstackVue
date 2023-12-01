// import { EngineName, CompletionRequest, OpenAI } from '@dalenguyen/openai';
// require('dotenv').config();

// const openAI = new OpenAI(process.env.OPENAI_API_KEY!);

// async function createChatCompletion(prompt: string): Promise<any> {
//     const completionRequest: CompletionRequest = {
//         prompt: prompt,
//     };

//     const completion = await openAI.createCompletion(EngineName.Davinci, completionRequest);
//     return completion;
// }

// async function main() {
//     try {
//         const prompt = "You are a personal math tutor. Write and run code to answer math questions.\nUser: I need to solve 2+2, can you tell me the answer?";
//         const completion = await createChatCompletion(prompt);
//         console.log(completion);
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// }

// main();
