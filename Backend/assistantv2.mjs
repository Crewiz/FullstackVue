import OpenAI from "openai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  key: process.env.OPENAI_API_KEY,
});

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getOpenAIResponse(messages) {
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

async function main() {
  const systemMessage = { role: "system", content: "You are a helpful assistant that will create a recipe based on only the given ingredients, but you can ask for if its okay to add more ingredients if necessary" };
  const messages = [systemMessage];

  userInterface.setPrompt("\nYou: ");
  userInterface.prompt();

  userInterface.on("line", async (userInput) => {
    const userMessage = { role: "user", content: userInput };
    messages.push(userMessage);

    const response = await getOpenAIResponse(messages);

    console.log("Assistant:", response);

    // Add the assistant's response to the messages array
    const assistantMessage = { role: "assistant", content: response };
    messages.push(assistantMessage);

    // Prompt for the next user input
    userInterface.prompt();
  });

  userInterface.on("close", () => {
    console.log("Thank you for using this chat!");
    process.exit(0);
  });
}

main();