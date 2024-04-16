import OpenAI from "openai";

const openai = new OpenAI({apiKey: 'deleted for git push'}); // environment variable load not working; need to fix.

// Function to call OpenAI with basic prompt
const callOpenAI = async (prompt) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{role: "system", content: ""}, {role: "user", content: prompt}],
      model: "gpt-3.5-turbo", // Adjust the model as necessary
      max_tokens: 150
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return null;
  }
};

// Function for Chain of Thought processing
const callOpenAIChainOfThought = async (prompt) => {
  const detailedPrompt = `Let's think step by step to solve this: ${prompt}`;
  try {
    const completion = await openai.chat.completions.create({
      messages: [{role: "system", content: ""}, {role: "user", content: detailedPrompt}],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error with Chain of Thought call:', error);
    return null;
  }
};

export { callOpenAI, callOpenAIChainOfThought };
