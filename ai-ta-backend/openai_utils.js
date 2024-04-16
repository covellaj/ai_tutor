const axios = require('axios');

// Original function for basic requests
const callOpenAI = async (prompt) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
};

// New function for Chain of Thought processing
const callOpenAIChainOfThought = async (prompt) => {
  const detailedPrompt = `Let's think step by step to solve this: ${prompt}`;
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-002",
      prompt: detailedPrompt,
      max_tokens: 250,
      temperature: 0.5  // This parameter helps in controlling the randomness of the output
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error calling OpenAI API with Chain of Thought:', error);
    return null;
  }
};

module.exports = { callOpenAI, callOpenAIChainOfThought };
