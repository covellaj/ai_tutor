import axios from 'axios';

const callWolframAlpha = async (query) => {
  const url = `http://api.wolframalpha.com/v2/query?input=${encodeURIComponent(query)}&appid=${process.env.WOLFRAM_API_KEY}&output=json`;
  try {
    const response = await axios.get(url);
    if (response.data && response.data.queryresult && response.data.queryresult.pods) {
      return response.data.queryresult.pods.map(pod => pod.subpods.map(subpod => subpod.plaintext).join('\n')).join('\n\n');
    }
    return 'No results found.';
  } catch (error) {
    console.error('Error calling Wolfram Alpha API:', error);
    return 'Error processing your query.';
  }
};

export { callWolframAlpha };
