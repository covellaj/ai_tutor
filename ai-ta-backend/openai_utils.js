import OpenAI from "openai";
import { callWolframAlpha } from "./wolfram_utils.js"

const openai = new OpenAI({apiKey: 'deleted key for git commit.'}); // environment variable load not working; need to fix.

// Function to call OpenAI with basic prompt
const callOpenAI = async (prompt) => {
  try {
    const manager_response = await openai.chat.completions.create({
      messages: [
        {role: "system", content: "You are an AI Manager for the Minerva Tutoring System. Your role is to interact with the system and coordinate with different Agents to provide the best, \
        and most accurate, responses possible. If the student asks a question that requires several steps and calculations, you should call up the the tool solutionAgent. If the student \
        just wants to chat, you can respond on your own and don't need to call any agents. If you need to do a mathematical calucation, you can call up the tool wolframAlpha."}, 
        {role: "user", content: prompt}, 
      ],
      model: "gpt-3.5-turbo", // Adjust the model as necessary
      max_tokens: 150,
      tools: [{
        "type": "function",
        "function": {
          "name": "solutionAgent",
          "description": "An AI Agent that specializes in providing solutions to complex, multi-step problems. If the response requires several steps and calculations call these Agents.",
          "parameters": {
            "type": "object",
            "properties": {"question": {"type": "string", "description": "A Restatment of the Student Question that requires step-by-step reasoning and calculations."}},
            "required": ["question"],
          },
        },
      }, {
        "type": "function",
        "function": {
          "name": "callWolframAlpha", 
          "description": "Computational System that can solve many Mathematical Expressions. This is the simple version, so inputs should be formatted as simple strings: \n \
           Example of a Simple Expression: sqrt(2) + (1/23)*5 + 2, \n \
           Example of a Simple Equation: 5*x + 3 = 2, \n \
           Example of a System of Equations: 5*x + 2*y = 2, sqrt(x) - 5 = y.",
          "parameters": { "type": "object", "properties": {"equations": {"type": "string", "description": "Simple Equations for input into the tool callWolframAlpha."}}, "required": ["equations"]}
        },
      }]
    });

    // console.log(manager_response.choices[0].message.tool_calls[0].function);
    // console.log(manager_response.choices[0].message.tool_calls[0].function.name);
    // console.log(manager_response.choices[0].message.tool_calls[0].function.arguments);

    /*
    def execute_function_call(message):
    if message.tool_calls[0].function.name == "ask_database":
        query = json.loads(message.tool_calls[0].function.arguments)["query"]
        results = ask_database(conn, query)
    else:
        results = f"Error: function {message.tool_calls[0].function.name} does not exist"
    return results
    */
    if (manager_response.choices[0].finish_reason === "tool_calls") {
      if (manager_response.choices[0].message.tool_calls[0].function.name === "solutionAgent") {
        return "You tried to call a solutionAgent, I hope this was expected!" // Will have to add more here.
      } else if (manager_response.choices[0].message.tool_calls[0].function.name === "callWolframAlpha") {
        return "You tried to call Wolfram Alpha, I hope this is Right!"
      }} else {
        return manager_response.choices[0].message.content;
    };

    return "Something Went Wrong, You shouldn't be seeing this...";

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
